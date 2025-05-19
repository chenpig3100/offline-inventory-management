// services/announcementApi.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function AnnouncementView() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模擬 API 資料
  const mockData = [
    {
      id: 1,
      title: 'Five items has been successfully uploaded',
      date: '09/04/2025 10:00:00',
    },
    {
      id: 2,
      title: 'Five items has been successfully uploaded',
      date: '09/04/2025 10:00:00',
    },
    {
      id: 3,
      title: 'Five items has been successfully uploaded',
      date: '09/04/2025 10:00:00',
    },
    {
      id: 4,
      title: 'Five items has been successfully uploaded',
      date: '09/04/2025 10:00:00',
    },
    {
      id: 5,
      title: 'Five items has been successfully uploaded',
      date: '09/04/2025 10:00:00',
    },
  ];

  useEffect(() => {
    // 模擬載入時間
    const loadData = async () => {
      setTimeout(() => {
        setAnnouncements(mockData);
        setLoading(false);
      }, 1000); // 模擬 1 秒延遲
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {announcements.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // Android 陰影
    shadowColor: '#000', // iOS 陰影
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});
