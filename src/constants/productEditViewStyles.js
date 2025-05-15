import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        marginBottom: 16
    },
    dropdown: {
        marginBottom: 16,
        zIndex: 1000, // important for dropdown stacking
    },
    wrapper: {
        zIndex: 1000,
        position: 'relative',
        marginBottom:20
    },
    Image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 16
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    }
});