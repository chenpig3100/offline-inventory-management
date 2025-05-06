// constants/announcementStyles.js
import { StyleSheet } from 'react-native';

export const announcementStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
  },
});

