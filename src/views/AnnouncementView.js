//Vivian
// views/AnnouncementView.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { fetchAnnouncements } from '../services/announcementApi';
import { announcementStyles as styles } from '../constants/announcementStyles'; // 或 styles/

export default function AnnouncementView() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.log('資料載入失敗');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007aff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {announcements.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
