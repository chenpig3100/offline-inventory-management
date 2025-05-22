import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TextInput, Button,
  Image, Alert, StyleSheet
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { insertProduct } from '../modules/product';
import categoryData from '../data/category.json';
import { countryList } from '../data/country';

export default function CreateProductView() {
  const [form, setForm] = useState({
    name: '', description: '', amount: '', unit: '',
    part_no: '', manufacturer: '', category_main: '',
    category_sub: '', category_sub_sub: '', condition: '',
    country: '', image: null
  });

  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [subSubOpen, setSubSubOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const [mainItems, setMainItems] = useState([]);
  const [subItems, setSubItems] = useState([]);
  const [subSubItems, setSubSubItems] = useState([]);
  const [countryItems, setCountryItems] = useState([]);

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });
    if (!result.canceled) handleChange('image', result.assets[0].uri);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Enable camera access to use this feature.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) handleChange('image', result.assets[0].uri);
  };

  const handleSubmit = async () => {
    try {
      const category_id = categoryData?.[form.category_main]?.[form.category_sub]?.[form.category_sub_sub];

      if (!category_id) {
        Alert.alert("Error", "Invalid category selection.");
        return;
      }

      await insertProduct({
        ...form,
        amount: parseInt(form.amount) || 0,
        category_id
      });

      Alert.alert('Success', 'Product saved.');
      setForm({
        name: '', description: '', amount: '', unit: '',
        part_no: '', manufacturer: '', category_main: '',
        category_sub: '', category_sub_sub: '', condition: '',
        country: '', image: null
      });

    } catch (e) {
      console.error(e);
      Alert.alert('Failed', 'Could not save product.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      {['name', 'description', 'amount', 'unit', 'part_no', 'manufacturer', 'condition'].map(field => (
        <TextInput
          key={field}
          placeholder={field}
          value={form[field]}
          onChangeText={text => handleChange(field, text)}
          style={styles.input}
          keyboardType={field === 'amount' ? 'numeric' : 'default'}
        />
      ))}

      {/* Dropdowns */}
      <DropDownPicker
        open={mainOpen}
        value={form.category_main}
        items={mainItems}
        setOpen={setMainOpen}
        setValue={(cb) => handleChange('category_main', cb(null))}
        setItems={setMainItems}
        placeholder="Select Segment"
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
        zIndex={500}
        style={styles.dropdown}
      />

      {/* Image buttons */}
      <View style={styles.imageRow}>
        <Button title="Choose Image" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />
      </View>

      {form.image && <Image source={{ uri: form.image }} style={styles.imagePreview} />}

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
  imagePreview: { height: 200, marginBottom: 10 }
});
