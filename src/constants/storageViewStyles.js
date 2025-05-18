import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#fff",
      },
      scrollContent: {
        padding: 20,
        paddingBottom: 80, // 留空給底部按鈕
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
      },
      barContainer: {
        height: 20,
        backgroundColor: "green",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
      },
      usedBar: {
        position: "absolute",
        left: 0,
        height: "100%",
        backgroundColor: "red",
        zIndex: 2,
      },
      availableBar: {
        flex: 1,
        backgroundColor: "green",
      },
      legendRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
      },
      legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
      },
      circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
      },
      usageText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
      },
      pickerWrapper: {
        borderWidth: Platform.OS === "android" ? 1 : 0,
        borderColor: "#ccc",
        borderRadius: 6,
        marginTop: 5,
      },
      picker: {
        height: 40,
        width: "100%",
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
      }
});