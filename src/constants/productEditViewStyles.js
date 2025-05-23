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
        //zIndex: 1000, // important for dropdown stacking
    },
    wrapper: {
        //zIndex: 1000,
        position: 'relative',
        marginBottom:20
    },
    imageList: {
        flexDirection: 'row',
        maxHeight: 110,
        marginVertical: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10
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
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 15,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    }
});