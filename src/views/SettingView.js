import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Bell, HelpCircle, Settings, ChevronRight } from "lucide-react-native";

export default function SettingView() {
  const [autoSync, setAutoSync] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      {/* Account Info */}
      <View style={styles.accountBox}>
        <Text style={styles.accountName}>Kom Wang</Text>
        <Text style={styles.accountId}>ID:123456789</Text>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <Text>Auto Sync</Text>
          <Switch value={autoSync} onValueChange={setAutoSync} />
        </View>

        {["Manage Storage", "FAQ", "Privacy Policy", "Log Out"].map((label) => (
          <TouchableOpacity key={label} style={styles.settingRow}>
            <Text>{label}</Text>
            <ChevronRight size={20} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Version Info */}
      <View style={styles.versionBox}>
        <Text style={styles.versionText}>Version 10.2.34</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#a5f3fc",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerWhite: {
    color: "#ffffff",
  },
  headerBlack: {
    color: "#000000",
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  accountBox: {
    backgroundColor: "#cffafe",
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "600",
  },
  accountId: {
    fontSize: 14,
    color: "#333",
  },
  section: {
    paddingHorizontal: 16,
    gap: 12,
  },
  settingRow: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  versionBox: {
    marginTop: 32,
    alignItems: "center",
    paddingBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: "#888",
  },
});
