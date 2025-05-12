//Bryan
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState} from 'react';
import styles from "../constants/inventoryViewStyles"


// for mock test
const mockUploaded = [
  {
    id: 1,
    name: 'Truck',
    createdAt: '2025/09/04 10:00:00',
    image: require('../assets/icons/inventorylist.png')
  },
  {
    id: 2,
    name: 'Train',
    createdAt: '2025/09/05 10:00:00',
    image: require('../assets/icons/inventorylist.png')
  }
];

const mockNotUploaded = [
  {
    id: 3,
    name: 'Bus',
    createdAt: '2025/10/11 15:00:00',
    image: require('../assets/icons/inventorylist.png')
  }
];

export default function InventoryView() {
  const [viewType, setViewType] = useState('uploaded');

  const data = viewType === 'uploaded' ? mockUploaded : mockNotUploaded;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // navigate to edit view
        console.log('Not develop yet.')
      }}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.createdAt}</Text>
        </View>
      </TouchableOpacity>
  );

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
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100}}
        />
    </View>
  );
}