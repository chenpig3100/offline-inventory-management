import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FAQ_DATA = [
  {
    question: "How do I sync data?",
    answer: "Go to Settings and enable Auto Sync. Your data will sync automatically in the background.",
  },
  {
    question: "Can I use the app offline?",
    answer: "Yes. The app supports offline usage and data will upload once you’re back online.",
  },
  {
    question: "How long is my history stored?",
    answer: "You can choose to keep history from 1 to 6 months in Storage settings.",
  },
];

export default function FAQView({ onNavigateTop }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Frequently Asked Questions</Text>

        {FAQ_DATA.map((item, index) => (
          <View key={index} style={styles.qaItem}>
            <Pressable onPress={() => toggleExpand(index)} style={styles.questionRow}>
              <Text style={styles.question}>{item.question}</Text>
              <AntDesign
                name={expandedIndex === index ? "up" : "down"}
                size={16}
                color="gray"
              />
            </Pressable>
            {expandedIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
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
  qaItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: "#444",
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
