import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropdownPicker from "react-native-dropdown-picker";
import styles from "../../constants/productEditViewStyles"; 

export default function ProductEditView({ product, onBack }) {
    const [imageUri, setImageUri] = useState(null);

    const [openSegment, setOpenSegment] = useState(false);
    const [segment, setSegment] = useState(null);
    const [segmentItems, setSegmentItems] = useState([]); // TODO: supply content

    const [openFamily, setOpenFamily] = useState(false);
    const [family, setFamily] = useState(null);
    const [familyItems, setFamilyItems] = useState([]); // TODO: supply content

    const [openCategoryName, setOpenCategoryName] = useState(false);
    const [categoryName, setCategoryName] = useState(null);
    const [categoryNameItems, setCategoryNameItems] = useState([]); // TODO: supply content

    const [partNo, setPartNo] = useState(null);
    const [partItems, setPartItems] = useState([]); // TODO: supply content

    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [manufacturer, setManufacturer] = useState(product?.manufacturer || '');
    const [condition, setCondition] = useState(product?.condition || '');
    const [country, setCountry] = useState(product?.country || '');

    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Product</Text>

            <View style={styles.wrapper}>
                <DropdownPicker
                open={openSegment}
                setOpen={setOpenSegment}
                value={segment}
                setValue={setSegment}
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
                open={openFamily}
                setOpen={setOpenFamily}
                value={family}
                setValue={setFamily}
                items={familyItems}
                setItems={setFamilyItems}
                zIndex={2000}
                dropDownContainerStyle={{
                    elevation: 10,
                    zIndex: 1000
                  }}
                placeholder="Select Family"
                style={styles.dropdown}
                />

                <DropdownPicker
                open={openCategoryName}
                setOpen={setOpenCategoryName}
                value={categoryName}
                setValue={setCategoryName}
                items={categoryNameItems}
                setItems={setCategoryNameItems}
                zIndex={1000}
                dropDownContainerStyle={{
                    elevation: 10,
                    zIndex: 1000
                  }}
                placeholder="Select Category Name"
                style={styles.dropdown}
                />
            </View>
            
            <TextInput placeholder="Product Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />

            <DropdownPicker
                open={false}
                value={partNo}
                setValue={setPartNo}
                items={partItems}
                setItems={setPartNo}
                placeholder="Select Part No."
                style={styles.dropdown}
                />
            
            <TextInput placeholder="Manufacturer" value={manufacturer} onChangeText={setManufacturer} style={styles.input} />
            <TextInput placeholder="Condition" value={condition} onChangeText={setCondition} style={styles.input} />
            <TextInput placeholder="Country" value={country} onChangeText={setCountry} style={styles.input} />

            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <View style={styles.buttonRow}>
                <Button title="Use Camera" onPress={handleTakePhoto} />
                <Button title="From Album" onPress={handlePickImage} />
            </View>

            <Button title="Back" onPress={onBack} />
        </ScrollView>
    )
}