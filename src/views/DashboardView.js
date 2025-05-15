import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts, initProductTable, getDBConnection } from '../modules/product';



export default function Dashboard({ onSwitchTab }) {
  const [totalItems, setTotalItems] = useState(0);
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        setLoading(true);
        try {
          await getDBConnection();         // Ensure DB is ready
          await initProductTable();        // Ensure table exists
          const products = await getAllProducts();
          setTotalItems(products.length);

          // most recent (sort using id)
          const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 5);
          setRecentItems(recent);
        } catch (err) {
          console.error('Error loading dashboard:', err);
        } finally {
          setLoading(false);
        }
      };

      setup();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={{
      padding: 12,
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      marginVertical: 6
    }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
      <Text>Amount: {item.amount} {item.unit}</Text>
      <Text style={{ color: 'gray', fontSize: 12 }}>ID: {item.id}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Total Inventory Items</Text>
        <Text style={{ fontSize: 36, color: '#007AFF', marginTop: 6 }}>{totalItems}</Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Recent Items</Text>
      <FlatList
        data={recentItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 20
        }}
        onPress={() => onSwitchTab('Inventory')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}
