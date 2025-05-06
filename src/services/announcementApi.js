// services/announcementApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/announcements`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
