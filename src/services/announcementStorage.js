import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'announcements';
const NEW_ANNOUNCEMENT_FLAG = 'hasNewAnnouncements'; // 用來記錄是否有新公告

// 取得所有公告
export const getAnnouncements = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load announcements:', e);
    return [];
  }
};

// 新增公告並設置為有新公告
export const addAnnouncement = async (announcement) => {
  try {
    const existing = await getAnnouncements();
    const updated = [announcement, ...existing]; // 最新的在最上面
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    await AsyncStorage.setItem(NEW_ANNOUNCEMENT_FLAG, 'true');
  } catch (e) {
    console.error('Failed to save announcement:', e);
  }
};

// 檢查是否有新公告（紅點用）
export const getHasNewAnnouncements = async () => {
  try {
    const flag = await AsyncStorage.getItem(NEW_ANNOUNCEMENT_FLAG);
    return flag === 'true';
  } catch (e) {
    console.error('Failed to check new announcements:', e);
    return false;
  }
};

// 設定是否有新公告（例如看過後設為 false）
export const setHasNewAnnouncements = async (value) => {
  try {
    await AsyncStorage.setItem(NEW_ANNOUNCEMENT_FLAG, value ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to update new announcements flag:', e);
  }
};
