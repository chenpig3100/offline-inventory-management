import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TextInput, Button,
  Image, Alert, StyleSheet, TouchableOpacity
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { insertProduct } from '../modules/product';
import categoryData from '../data/category.json';
import { countryList } from '../data/country';
import { manufacturerList, conditionList } from '../data/porductOptions';

export default function CreateProductView() {
  const [form, setForm] = useState({
    name: '', description: '', quantity: '', unit: '',
    part_no: '', manufacturer: '', category_main: '',
    category_sub: '', category_sub_sub: '', condition: '',
    country: '', image: []
  });

  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [subSubOpen, setSubSubOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const [mainItems, setMainItems] = useState([]);
  const [subItems, setSubItems] = useState([]);
  const [subSubItems, setSubSubItems] = useState([]);
  const [countryItems, setCountryItems] = useState([]);

  const [openManufacturer, setOpenManufacturer] = useState(false);
  const [openCondition, setOpenCondition] = useState(false);

  useEffect(() => {
  setMainItems(Object.keys(categoryData).map(k => ({ label: k, value: k })));
  setCountryItems(countryList.map(c => ({ label: c, value: c })));
}, []);

useEffect(() => {
  if (form.category_main) {
    const subs = Object.keys(categoryData[form.category_main] || {});
    setSubItems(subs.map(s => ({ label: s, value: s })));
  } else {
    setSubItems([]);
  }
  setForm(f => ({ ...f, category_sub: '', category_sub_sub: '' }));
}, [form.category_main]);

useEffect(() => {
  if (form.category_main && form.category_sub) {
    const subsubObj = categoryData[form.category_main]?.[form.category_sub] || {};
    const subsubList = Object.entries(subsubObj).map(([name, id]) => ({ label: name, value: name }));
    setSubSubItems(subsubList);
  } else {
    setSubSubItems([]);
  }
  setForm(f => ({ ...f, category_sub_sub: '' }));
}, [form.category_sub]);

  const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const handleRemoveImage = (indexToRemove) => {
    setForm(f => ({
      ...f,
      image: f.image.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please allow access to photo library in settings.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });
    if (!result.canceled) handleChange('image', [...form.image, result.assets[0].uri]);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Enable camera access to use this feature.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) handleChange('image', [...form.image, result.assets[0].uri]);
  };

  const handleSubmit = async () => {
    try {
        const requiredFields = ['name', 'description', 'quantity', 'unit', 'part_no', 'manufacturer', 'condition', 'country'];
    const missingFields = requiredFields.filter(field => !form[field] || form[field].trim() === '');

    if (missingFields.length > 0) {
      const labels = {
        name: 'Name',
        description: 'Description',
        quantity: 'Quantity',
        unit: 'Unit',
        part_no: 'Part Number',
        manufacturer: 'Manufacturer',
        condition: 'Condition',
        country: 'Country',
      };

      const missingLabels = missingFields.map(f => labels[f] || f).join(', ');
      Alert.alert("Missing Information", `Please fill in: ${missingLabels}`);
      return;
      }

      const category_id = categoryData?.[form.category_main]?.[form.category_sub]?.[form.category_sub_sub];

      if (!category_id) {
        Alert.alert("Error", "Invalid category selection.");
        return;
      }

      await insertProduct({
        ...form,
        quantity: parseInt(form.quantity) || 0,
        category_id
      });

      Alert.alert('Success', 'Product saved.');
      setForm({
        name: '', description: '', quantity: '', unit: '',
        part_no: '', manufacturer: '', category_main: '',
        category_sub: '', category_sub_sub: '', condition: '',
        country: '', image: []
      });

    } catch (e) {
      console.error(e);
      Alert.alert('Failed', 'Could not save product.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      {['name', 'description', 'quantity', 'unit', 'part_no'].map(field => (
        <TextInput
          key={field}
          placeholder={field}
          value={form[field]}
          onChangeText={text => handleChange(field, text)}
          style={styles.input}
          keyboardType={field === 'quantity' ? 'numeric' : 'default'}
        />
      ))}

      {/* Dropdowns */}
      <DropDownPicker
        open={openManufacturer}
        setOpen={setOpenManufacturer}
        value={form.manufacturer}
        setValue={(cb) => handleChange('manufacturer', cb(null))}
        items={manufacturerList}
        placeholder="Select Manufacturer"
        searchable={true}
        searchPlaceholder="Type Manufacturer"
        zIndex={5000}
        style={styles.dropdown}
        />

      <DropDownPicker
        open={openCondition}
        setOpen={setOpenCondition}
        value={form.condition}
        setValue={(cb) => handleChange('condition', cb(null))}
        items={conditionList}
        placeholder="Select Condition"
        zIndex={4000}
        style={styles.dropdown}
        />

      <DropDownPicker
        open={mainOpen}
        value={form.category_main}
        items={mainItems}
        setOpen={setMainOpen}
        setValue={(cb) => handleChange('category_main', cb(null))}
        setItems={setMainItems}
        placeholder="Select Segment"
        searchable={true}
        searchPlaceholder="Type Segment"
        zIndex={3000}
        style={styles.dropdown}
      />

      <DropDownPicker
        open={subOpen}
        value={form.category_sub}
        items={subItems}
        setOpen={setSubOpen}
        setValue={(cb) => handleChange('category_sub', cb(null))}
        setItems={setSubItems}
        placeholder="Select Family"
        searchable={true}
        searchPlaceholder="Type Family"
        zIndex={2000}
        style={styles.dropdown}
        disabled={!form.category_main}
      />

      <DropDownPicker
        open={subSubOpen}
        value={form.category_sub_sub}
        items={subSubItems}
        setOpen={setSubSubOpen}
        setValue={(cb) => handleChange('category_sub_sub', cb(null))}
        setItems={setSubSubItems}
        placeholder="Select Category"
        searchable={true}
        searchPlaceholder="Type Category"
        zIndex={1000}
        style={styles.dropdown}
        disabled={!form.category_sub}
      />

      <DropDownPicker
        open={countryOpen}
        value={form.country}
        items={countryItems}
        setOpen={setCountryOpen}
        setValue={(cb) => handleChange('country', cb(null))}
        setItems={setCountryItems}
        placeholder="Select Country"
        searchable={true}
        searchPlaceholder="Type Country"
        zIndex={500}
        style={styles.dropdown}
      />

      {/* Image buttons */}
      <View style={styles.imageRow}>
        <Button title="Choose Image" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
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

      <Button title="Save Product" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 10, borderRadius: 6
  },
  dropdown: { marginBottom: 10 },
  imageRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginVertical: 10
  },
  imagePreview: { height: 200, marginBottom: 10 },
  imageList: {
    flexDirection: 'row',
    marginVertical: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10
  },
  imageList: {
    flexDirection: 'row',
    maxHeight: 110,
    marginVertical: 10
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  }
});
