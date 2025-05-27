//Bryan
import { View, Text, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllProducts, initProductTable, getDBConnection, deleteProduct, markAllAsSynced } from '../../modules/product';
import React, { useCallback, useState} from 'react';
import styles from "../../constants/inventoryViewStyles"
import { FadeIn } from 'react-native-reanimated';
import { addAnnouncement } from '../../services/announcementStorage';
//Isaac
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

//online offline
import NetInfo from '@react-native-community/netinfo';


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
  const uploaded = data.filter(item => item.is_synced === 1);

  // check unsynced data
  if (unsynced.length === 0) {
    Alert.alert('Notice', 'There are no items to upload.');
    return;
  }

  // part_no + manufacturer can't be same
  const duplicateItems = unsynced.filter(unsyncedItem =>
    uploaded.some(uploadedItem =>
      uploadedItem.part_no === unsyncedItem.part_no &&
      uploadedItem.manufacturer === unsyncedItem.manufacturer
    )
  );

  if (duplicateItems.length > 0) {
    const dupDetails = duplicateItems.map(item =>
      `• ${item.name} (Part No: ${item.part_no}, Manufacturer: ${item.manufacturer})`
    ).join('\n');

    Alert.alert(
      'Duplicate Detected',
      `The following item(s) already exist in uploaded records:\n\n${dupDetails}\n\nPlease review before uploading.`
    );
    return;
  }

  // network
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    Alert.alert('Offline', 'You are currently offline. Please connect to the internet to upload.');
    return;
  }

  try {
    await markAllAsSynced(); 
    const refreshed = await getAllProducts();
    setData(refreshed);

    const now = new Date().toLocaleString();
    const timestamp = Date.now();

    // API TXT
    const logLines = unsynced.map((item, i) => {
      return `[${i + 1}] POST /api/upload
    ID           : ${item.id}
    Name         : ${item.name}
    Description  : ${item.description}
    Quantity       : ${item.quantity}
    Unit         : ${item.unit}
    Part No      : ${item.part_no}
    Manufacturer : ${item.manufacturer}
    Category ID  : ${item.category_id}
    Condition    : ${item.condition}
    Country      : ${item.country}
    Image        : ${Array.isArray(item.image) ? item.image.join(', ') : item.image}
    Synced       : ${item.is_synced}
    Updated At   : ${item.updated_at}
    `;
    });

    const fileContent = `Manual Upload Log (${now})\n\n` + logLines.join('\n');
    const txtFileUri = `${FileSystem.documentDirectory}manual_upload_${timestamp}.txt`;
    await FileSystem.writeAsStringAsync(txtFileUri, fileContent);
    console.log('TXT saved at:', txtFileUri);

    // DB doc export
    const dbName = 'inventory.db';
    const sourcePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
    const exportDbPath = `${FileSystem.documentDirectory}${timestamp}_${dbName}`;

    const dbFile = await FileSystem.getInfoAsync(sourcePath);
    if (dbFile.exists) {
      await FileSystem.copyAsync({
        from: sourcePath,
        to: exportDbPath
      });
      console.log('DB exported at:', exportDbPath);

      // share function
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(txtFileUri); // txt
        await Sharing.shareAsync(exportDbPath); // db
      } else {
        Alert.alert('Notice', 'Sharing not available on this device');
      }
    } else {
      console.warn('Database file not found:', sourcePath);
    }

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