import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropdownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView } from "react-native";
import styles from "../../constants/productEditViewStyles"; 
import categoryData from "../../data/category.json";
import { countryList } from "../../data/country";
import { manufacturerList, conditionList } from '../../data/porductOptions';
import { updateProduct } from "../../modules/product";
import { FlatList } from "react-native-gesture-handler";

export default function ProductEditView({ product, onBack }) {

    const [form, setForm] = useState({
        name: product?.name || '',
        description: product?.description || '',
        manufacturer: product?.manufacturer || '',
        condition: product?.condition || '',
        country: product?.country || '',
        partNo: product?.part_no || '',
        segment: '',
        family: '',
        categoryName: '',
        image: (() => {
            try {
              if (Array.isArray(product?.image)) return product.image;
              if (typeof product?.image === 'string') {
                const parsed = JSON.parse(product.image);
                return Array.isArray(parsed) ? parsed : [];
              }
              return [];
            } catch {
              return [];
            }
          })()
    });

    const [openSegment, setOpenSegment] = useState(false);
    const [segmentItems, setSegmentItems] = useState([]);

    const [openFamily, setOpenFamily] = useState(false);
    const [familyItems, setFamilyItems] = useState([]);

    const [openCategoryName, setOpenCategoryName] = useState(false);
    const [categoryNameItems, setCategoryNameItems] = useState([]);

    const [openCountry, setOpenCountry] = useState(false);
    const [countryItems, setCountryItems] = useState([]);

    const [openManufacturer, setOpenManufacturer] = useState(false);
    const [openCondition, setOpenCondition] = useState(false);

    // Open camera
    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setForm(f => ({ ...f, image: [...f.image, uri] }));
        }
    };
    
    // Open photo library
    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setForm(f => ({ ...f, image: [...f.image, uri] }));
        }
    };
    
    /*
    useEffect(() => {
    // 根據 category_id 反查名稱
    if (product?.category_id) {
        let found = false;
        for (const [segment, families] of Object.entries(categoryData)) {
        for (const [family, categories] of Object.entries(families)) {
            for (const [name, id] of Object.entries(categories)) {
            if (id === product.category_id) {
                setForm(f => ({
                ...f,
                segment,
                family,
                categoryName: name
                }));
                found = true;
                break;
            }
            }
            if (found) break;
        }
        if (found) break;
        }
    }
    }, [product]);
    */

    useEffect(() => {
    if (product?.category_id) {
        setTimeout(() => {
        for (const [segment, families] of Object.entries(categoryData)) {
            for (const [family, categories] of Object.entries(families)) {
            for (const [name, id] of Object.entries(categories)) {
                if (id === product.category_id) {
                setForm(f => ({
                    ...f,
                    segment,
                    family,
                    categoryName: name
                }));
                return;
                }
            }
            }
        }
        }, 100); // 延遲執行，等待 dropdown 初始化完成
    }
    }, []);

    useEffect(() => {
        setSegmentItems(Object.keys(categoryData).map(k => ({ label: k, value: k })));
        setCountryItems(countryList.map(c => ({ label: c, value: c })));
    }, []);

    useEffect(() => {
        if (form.segment) {
            const families = Object.keys(categoryData[form.segment] || {});
            setFamilyItems(families.map(s => ({ label: s, value: s })));

            if (!families.includes(form.family)) {
                setForm(f => ({ ...f, family: '', categoryName: '' }));
            }
        } else {
            setFamilyItems([]);
            setForm(f => ({ ...f, family: '', categoryName: '' }));
        }
    }, [form.segment]);

    useEffect(() => {
        if (form.segment && form.family) {
            const categoryObj = categoryData[form.segment]?.[form.family] || {};
            const categoryList = Object.entries(categoryObj).map(([name, id]) => ({ label: name, value: name }));
            setCategoryNameItems(categoryList);

            if (!Object.keys(categoryObj).includes(form.categoryName)) {
                setForm(f => ({ ...f, categoryName: '' }));
            }
        } else {
            setCategoryNameItems([]);
            setForm(f => ({ ...f, categoryName: '' }));
        }
    }, [form.family]);

    // handle data change on screen
    const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

    // handle data change in database
    const handleSave = async () => {
        try {

            // 必填欄位清單
            const requiredFields = ['name', 'description', 'partNo', 'manufacturer', 'condition', 'country'];
            const missingFields = requiredFields.filter(field => !form[field] || form[field].trim() === '');

            if (missingFields.length > 0) {
            const labels = {
                name: 'Product Name',
                description: 'Description',
                partNo: 'Part Number',
                manufacturer: 'Manufacturer',
                condition: 'Condition',
                country: 'Country'
            };

            const missingLabels = missingFields.map(f => labels[f] || f).join(', ');
            Alert.alert('Missing Information', `Please fill in: ${missingLabels}`);
            return;
            }

            // 類別也要檢查是否選好
            const category_id = categoryData?.[form.segment]?.[form.family]?.[form.categoryName];
            if (!category_id) {
            Alert.alert("Missing Category", "Please select Segment, Family and Category.");
            return;
            }

            await updateProduct({
                id: product.id,
                name: form.name,
                description: form.description,
                quantity: parseInt(form.quantity) || 0,
                unit: form.unit,
                part_no: form.partNo,
                manufacturer: form.manufacturer,
                category_id: categoryData?.[form.segment]?.[form.family]?.[form.categoryName], // according to the algorithm to find the id
                condition: form.condition,
                country: form.country,
                image: JSON.stringify(form.image)
            });

            Alert.alert('Success', 'Product updated sccessfully.');
            onBack();
        } catch (err) {
            console.error('Save failed:', err);
            Alert.alert('Error', 'Failed to update product.');
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setForm(f => ({
          ...f,
          image: f.image.filter((_, idx) => idx !== indexToRemove)
        }));
      };
    
    return (
        <KeyboardAwareScrollView 
        contentContainerStyle={styles.container}
        nestedScrollEnabled={true}
        enableOnAndroid={true}
        extraScrollHeight={100}
        >
        <Text style={styles.title}>Edit Product</Text>

        <View style={styles.wrapper}>
            <DropdownPicker
                //mode="MODAL"
                open={openSegment}
                setOpen={setOpenSegment}
                value={form.segment}
                setValue={(cb) => handleChange('segment', cb(null))}
                items={segmentItems}
                setItems={setSegmentItems}
                zIndex={3000}
                dropDownContainerStyle={{
                    elevation: 10,
                    zIndex: 1000
                    }}
                placeholder="Select Segment"
                searchable={true}
                searchPlaceholder="Type Segment"
                style={styles.dropdown}
                />

            <DropdownPicker
                //mode="MODAL"
                open={openFamily}
                setOpen={setOpenFamily}
                value={form.family}
                setValue={(cb) => handleChange('family', cb(null))}
                items={familyItems}
                setItems={setFamilyItems}
                disabled={!form.segment}
                zIndex={2000}
                dropDownContainerStyle={{
                    elevation: 10,
                    zIndex: 1000
                    }}
                placeholder="Select Family"
                searchable={true}
                searchPlaceholder="Type Family"
                style={styles.dropdown}
                />

            <DropdownPicker
                //mode="MODAL"
                open={openCategoryName}
                setOpen={setOpenCategoryName}
                value={form.categoryName}
                setValue={(cb) => handleChange('categoryName', cb(null))}
                items={categoryNameItems}
                setItems={setCategoryNameItems}
                disabled={!form.family}
                zIndex={1000}
                dropDownContainerStyle={{
                    elevation: 10,
                    zIndex: 1000
                }}
                placeholder="Select Category Name"
                searchable={true}
                searchPlaceholder="Type Category"
                style={styles.dropdown}
                />
        </View>
        
        <TextInput placeholder="Product Name" value={form.name} onChangeText={(v) => handleChange('name', v)} style={styles.input} />
        <TextInput placeholder="Description" value={form.description} onChangeText={(v) => handleChange('description', v)} style={styles.input} />
        <TextInput placeholder="PartNo" value={form.partNo} onChangeText={(v) => handleChange('partNo', v)} style={styles.input} />
    
        <DropdownPicker
        open={openManufacturer}
        setOpen={setOpenManufacturer}
        value={form.manufacturer}
        setValue={(cb) => handleChange('manufacturer', cb(null))}
        items={manufacturerList}
        placeholder="Select Manufacturer"
        searchable={true}
        searchPlaceholder="Type Manufacturer"
        zIndex={3000}
        style={styles.dropdown}
        />

        <DropdownPicker
        open={openCondition}
        setOpen={setOpenCondition}
        value={form.condition}
        setValue={(cb) => handleChange('condition', cb(null))}
        items={conditionList}
        placeholder="Select Condition"
        zIndex={2000}
        style={styles.dropdown}
        />

        <DropdownPicker
            //mode="MODAL"
            open={openCountry}
            setOpen={setOpenCountry}
            value={form.country}
            setValue={(cb) => handleChange('country', cb(null))}
            items={countryItems}
            setItems={setCountryItems}
            zIndex={1000}
            placeholder="Select Country"
            searchable={true}
            searchPlaceholder="Type Country"
            style={styles.dropdown}
            />

        <View style={{ marginVertical: 10 }}>
            {Array.isArray(form.image) && form.image.length > 0 && (
                <ScrollView horizontal style={styles.imageList}>
                    {form.image.map((uri, index) => (
                        <View key={index} style={{ position: 'relative', marginRight: 10 }}>
                            <Image source={{ uri }} style={styles.image} />
                            <TouchableOpacity
                                onPress={() => handleRemoveImage(index)}
                                style={styles.deleteButton}
                            >
                                <Text style={{ color: 'white', fontSize: 12 }}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>

        <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                <Text style={styles.buttonText}>Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                <Text style={styles.buttonText}>From Album</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={onBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAwareScrollView>
    );
}