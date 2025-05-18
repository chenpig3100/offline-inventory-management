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
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 16
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingHorizontal: 20
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 6,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#74E8FF',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 16
    },
    buttonSecondary: {
        backgroundColor: '#8E8E8E'
    }
});