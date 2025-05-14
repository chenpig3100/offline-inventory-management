import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingTop: 8
    },
    switchBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16
    },
    switchButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#eee'
    },
    activeButton: {
        backgroundColor: '#74E8FF'
    },
    switchText: {
        fontWeight: 'bold',
        fontSize: 14
    },
    card: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignItems: 'center'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 12
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    date: {
        fontSize:12,
        color: '#666'
    }
});