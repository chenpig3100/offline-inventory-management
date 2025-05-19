//Vivian
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 用於時鐘圖示

export default function AnnouncementView() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockData = [
    {
      id: 1,
      title: 'Five items has been successfully uploaded',
      date: '09/04/2025 10:00:00',
      content: 'These five items were added manually to local storage.',
    },
    {
      id: 2,
      title: 'Inventory sync complete',
      date: '09/05/2025 09:30:00',
      content: 'Inventory data synced with local storage.',
    },
    {
      id: 3,
      title: 'Backup successful',
      date: '09/06/2025 08:20:00',
      content: 'Local database backup completed.',
    },
  ];

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        // 模擬延遲
        setTimeout(() => {
          setAnnouncements(mockData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.log('🚨Error loading announcements:', error);
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00BFFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {announcements.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.row}>
            <Ionicons name="time-outline" size={16} color="gray" style={{ marginRight: 6 }} />
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});
