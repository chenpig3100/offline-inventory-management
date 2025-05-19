// Vincent
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../constants/settingViewStyles";


export default function SettingView({ onNavigateTop  }) {
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
        <TouchableOpacity
          key={label}
          style={styles.settingRow}
          onPress={() => {
            if (label === "Manage Storage") {
              onNavigateTop && onNavigateTop("Storage");
            }
            else if (label === "FAQ") {
              onNavigateTop && onNavigateTop("FAQ");
            }
            else if (label === "Privacy Policy") {
              onNavigateTop && onNavigateTop("Privacy");
            }
            else if (label === "Log Out") {
              onNavigateTop && onNavigateTop("Login");
            }
          }}
        >
          <Text>{label}</Text>

        </TouchableOpacity>
))}
      </View>

      {/* Version Info */}
      <View style={styles.versionBox}>
        <Text style={styles.versionText}>Version 10.2.34</Text>
      </View>
    </ScrollView>
  );
};
