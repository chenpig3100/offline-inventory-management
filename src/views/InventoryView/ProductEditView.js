import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropdownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../constants/productEditViewStyles"; 
import categoryData from "../../data/category.json";
import { countryList } from "../../data/country";
import { updateProduct } from "../../modules/product";

export default function ProductEditView({ product, onBack }) {

    const [form, setForm] = useState({
        name: product?.name || '',
        description: product?.description || '',
        manufacturer: product?.manufacturer || '',
        condition: product?.condition || '',
        country: product?.country || '',
        partNo: product?.partNo || '',
        segment: '',
        family: '',
        categoryName: '',
        image: product?.image || null
    });

    const [openSegment, setOpenSegment] = useState(false);
    const [segmentItems, setSegmentItems] = useState([]);

    const [openFamily, setOpenFamily] = useState(false);
    const [familyItems, setFamilyItems] = useState([]);

    const [openCategoryName, setOpenCategoryName] = useState(false);
    const [categoryNameItems, setCategoryNameItems] = useState([]);

    const [openCountry, setOpenCountry] = useState(false);
    const [countryItems, setCountryItems] = useState([]);

    // Open camera
    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setForm(f => ({ ...f, image: uri }));
        }
    };

    // Open photo library
    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setForm(f => ({ ...f, image: uri }));
        }
    };

    useEffect(() => {
        setSegmentItems(Object.keys(categoryData).map(k => ({ label: k, value: k })));
        setCountryItems(countryList.map(c => ({ label: c, value: c })));
    }, []);

    useEffect(() => {
        if (form.segment) {
            const families = Object.keys(categoryData[form.segment] || {});
            setFamilyItems(families.map(s => ({ label: s, value: s })));
        } else {
            setFamilyItems([]);
        }
        setForm(f => ({ ...f, family: '', categoryName: '' }));
    }, [form.segment]);

    useEffect(() => {
        if (form.segment && form.family) {
            const categories = categoryData[form.segment]?.[form.family] || [];
            setCategoryNameItems(categories.map(c => ({ label: c, value: c })));
        } else {
            setCategoryNameItems([]);
        }
        setForm(f => ({ ...f, categoryName: '' }));
    }, [form.family]);

    // handle data change on screen
    const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

    // handle data change in database
    const handleSave = async () => {
        try {
            await updateProduct({
                id: product.id,
                name: form.name,
                description: form.description,
                amount: parseInt(form.amount) || 0,
                unit: form.unit,
                part_no: form.partNo,
                manufacturer: form.manufacturer,
                category_id: product.category_id, // according to the algorithm to find the id
                condition: form.condition,
                country: form.country,
                image: form.image
            });

            Alert.alert('Success', 'Product updated sccessfully.');
            onBack();
        } catch (err) {
            console.error('Save failed:', err);
            Alert.alert('Error', 'Failed to update product.');
        }
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
                    style={styles.dropdown}
                    />
            </View>
            
            <TextInput placeholder="Product Name" value={form.name} onChangeText={(v) => handleChange('name', v)} style={styles.input} />
            <TextInput placeholder="Description" value={form.description} onChangeText={(v) => handleChange('description', v)} style={styles.input} />
            <TextInput placeholder="PartNo" value={form.partNo} onChangeText={(v) => handleChange('partNo', v)} style={styles.input} />
            <TextInput placeholder="Manufacturer" value={form.manufacturer} onChangeText={(v) => handleChange('manufacturer', v)} style={styles.input} />
            <TextInput placeholder="Condition" value={form.condition} onChangeText={(v) => handleChange('condition', v)} style={styles.input} />

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
                style={styles.dropdown}
                />

            {form.image?.startsWith('file') || form.image?.startsWith('http') ? (
                <Image source={{ uri: form.image }} style={styles.image} />
            ) : null}

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
    )
}