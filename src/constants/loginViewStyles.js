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
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        elevation: 5
    },
    registerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    registerInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10
    }
});