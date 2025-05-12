import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7'
    },
    title: {
        fontSize: 24,
        marginBottom: 24
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    label: {
        width: 80,
        fontSize: 16,
    },
    input: {
        borderBottomWidth: 1,
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 6,
        fontSize: 16
    }
});