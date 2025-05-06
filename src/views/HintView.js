//Vivian
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

export default function AnnouncementScreen() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/announcements') // 這邊換成你的 API 位址
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
});

