import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../constants/storageViewStyles";

export default function StorageView({ onNavigateTop }) {
  const [selectedHistory, setSelectedHistory] = useState("1");
  const usedStorage = 12.3;
  const totalStorage = 128;
  const usedPercent = (usedStorage / totalStorage) * 100;

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Storage</Text>

        <View style={styles.barContainer}>
          <View style={[styles.usedBar, { width: `${usedPercent}%` }]} />
          <View style={styles.availableBar} />
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.circle, { backgroundColor: "red" }]} />
            <Text>Used Storage</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.circle, { backgroundColor: "green" }]} />
            <Text>Available Storage</Text>
          </View>
        </View>

        <Text style={styles.usageText}>
          {usedStorage} GB of {totalStorage} GB used
        </Text>

        <Text style={{ marginTop: 20 }}>Keep history records for:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedHistory}
            onValueChange={(itemValue) => setSelectedHistory(itemValue)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="1 month" value="1" />
            <Picker.Item label="3 months" value="3" />
            <Picker.Item label="6 months" value="6" />
          </Picker>
        </View>
      </ScrollView>

      {/* 固定底部按鈕 */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.backButton}
          onPress={() => onNavigateTop && onNavigateTop("Setting")}
        >
          <AntDesign name="arrowleft" size={20} color="black" />
          <Text style={styles.backText}>Back to Setting</Text>
        </Pressable>
      </View>
    </View>
  );
};
