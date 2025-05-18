import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function PrivacyPolicyView({ onNavigateTop }) {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.text}>
          We take your privacy seriously. This privacy policy explains how we collect, use, and protect your information.
        </Text>

        <Text style={styles.subheading}>1. Data Collection</Text>
        <Text style={styles.text}>
          We collect data you provide, including your name, email address, and uploaded content. We also collect device data to improve performance.
        </Text>

        <Text style={styles.subheading}>2. Data Usage</Text>
        <Text style={styles.text}>
          Your data is used only to deliver app functionality, improve features, and ensure secure usage. We do not sell your data to third parties.
        </Text>

        <Text style={styles.subheading}>3. Data Storage</Text>
        <Text style={styles.text}>
          All collected data is stored securely. You can delete your data at any time by contacting our support team or through your account settings.
        </Text>

        <Text style={styles.subheading}>4. Consent</Text>
        <Text style={styles.text}>
          By using this app, you agree to the terms outlined in this privacy policy. If you do not agree, please discontinue use of the app.
        </Text>

        <Text style={styles.subheading}>5. Updates</Text>
        <Text style={styles.text}>
          This policy may be updated periodically. Users will be notified of significant changes via in-app messages or email.
        </Text>
      </ScrollView>

      {/* 返回按鈕 */}
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
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    lineHeight: 20,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
  },
});
