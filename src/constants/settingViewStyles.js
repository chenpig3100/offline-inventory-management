import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
      }
});