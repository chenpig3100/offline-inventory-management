import { StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    container: {flex: 1 },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    navBar: {
        height: 60,
        backgroundColor: '#74E8FF',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topRightButtons: { flexDirection: 'row' },
    icon: { marginLeft: 12, fontSize:18 },
    title: { fontSize: 24, fontWeight: 'bold' },
    content: { flex: 1, padding: 16 },
    bottomBar: {
        height: 60,
        backgroundColor: '#74E8FF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tab: { fontSize: 16 },
    activeTab: { fontSize:16, fontWeight: 'bold', color: 'blue' },
    iconImage: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
        tintColor: 'white'
    },
    activeIcon: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
        tintColor: 'black'
    },
    label: {
        fontSize: 12,
        color: 'white',
        marginTop: 4
    },
    activeLabel: {
        fontSize: 12,
        color: 'black',
        marginTop: 4
    }
});