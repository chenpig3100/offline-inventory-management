//Bryan
import { View, Text, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllProducts, initProductTable, getDBConnection, deleteProduct, markAllAsSynced } from '../../modules/product';
import React, { useCallback, useState} from 'react';
import styles from "../../constants/inventoryViewStyles"
import { FadeIn } from 'react-native-reanimated';
import { addAnnouncement } from '../../services/announcementStorage';


export default function InventoryView({ onEditProduct }) {
  const [viewType, setViewType] = useState('uploaded');
  const [data, setData] = useState([]);
  const [loading, setLoadding] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        setLoadding(true);
        try {
          await initProductTable();
          const products = await getAllProducts();
          setData(products);
        } catch (err) {
          console.error('Error loading dashboard:', err);
        } finally {
          setLoadding(false);
        }
      };

      loadData();
    }, [])
  );

  const handleDelete = (item) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${item.name}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', style: 'destructive', onPress: async () => {
          try {
            await deleteProduct(item.id);
            setData(prev => prev.filter(p => p.id !== item.id)); //renew screen
          } catch (err) {
            console.error('Delete failed:', err);
            Alert.alert('Error', 'Failed to delete product.');
          }
        }}
      ]
    ); 
  };

  const handleManualUpload = async () => {
  const now = new Date().toLocaleString(); // current time
  const unsynced = data.filter(item => item.is_synced === 0);

  // check unsynced data
  if (unsynced.length === 0) {
    Alert.alert('Notice', 'There are no items to upload.');
    return;
  }

  try {
    await markAllAsSynced(); 
    const refreshed = await getAllProducts();
    setData(refreshed);

    // ✅ addannouncement（success）
    await addAnnouncement({
      title: 'Upload Success',
      date: now,
      content: 'All items marked as uploaded and saved locally.',
    });

    Alert.alert('Success', 'All items marked as uploaded.');
  } catch (err) {
    console.error('Manual upload failed:', err);

    // ❗addannouncement（fail）
    await addAnnouncement({
      title: 'Upload Failed',
      date: now,
      content: 'An error occurred while updating items.',
    });

    Alert.alert('Error', 'Failed to update items.');
  }
};


  const renderItem = ({ item }) => {
    const editable = item.is_synced === 0;
    const firstImage = getFirstImage(item.image);

    const content = (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
        {firstImage ? (
          <Image source={{ uri: firstImage }} style={styles.image} />
        ) : (
          <View style={[styles.image, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#999' }}>No image</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.updated_at}</Text>
        </View>

        {editable && (
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Image source={require('../../assets/icons/delete.png')} style={styles.deleteButton} />
          </TouchableOpacity>
        )}
      </View>
    );

    return editable ? (
      <TouchableOpacity
      style={styles.card}
      onPress={() => { onEditProduct(item) }}
      >
        {content}
      </TouchableOpacity>
    ) : (
      <View style={styles.card}>
        {content}
      </View>
    );
  };

  const filteredData = data.filter( item => 
    viewType === 'uploaded' ? item.is_synced === 1 : item.is_synced === 0
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Data...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Switch button */}
      <View style={styles.switchBar}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewType === 'uploaded' && styles.activeButton
          ]}
          onPress={() => setViewType('uploaded')}
          >
            <Text style={styles.switchText}>Uploaded</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewType === 'not_uploaded' && styles.activeButton
          ]}
          onPress={() => setViewType('not_uploaded')}
          >
            <Text style={styles.switchText}>Not uploaded</Text>
          </TouchableOpacity>
      </View>

      {/* Table list */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120}}
        />
      
      {/* Upload Button */}
      {viewType === 'not_uploaded' && (
        <View style={{ padding: 16 }}>
          <TouchableOpacity onPress={handleManualUpload} style={styles.uploadButton}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Manually Upload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

function getFirstImage(imageField) {
  try {
    if (!imageField) return null;

    if (Array.isArray(imageField)) {
      return imageField[0];
    }

    if (typeof imageField === 'string') {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed)) {
        return parsed[0];
      } else if (typeof parsed === 'string') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Image parsing failed:", e);
  }

  return null;
};