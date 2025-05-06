import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from "react-native";
import styles from '../constants/navSwitchBarStyles';

export default function MainLayOut({ children, onNavigateTop, onSwitchTab, activeTab }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Navigation Bar */}
                <View style={styles.navBar}>
                    <Text style={styles.title}>INEXLINK</Text>
                    <View style={styles.topRightButtons}>
                        <TouchableOpacity onPress={() => onNavigateTop('Hint')}>
                            <Image source={require('../assets/icons/help.png')} style={styles.iconImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onNavigateTop('Announcement')}>
                            <Image source={require('../assets/icons/notification.png')} style={styles.iconImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onNavigateTop('Setting')}>
                            <Image source={require('../assets/icons/setting.png')} style={styles.iconImage} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Middle Part */}
                <View style={styles.content}>
                    {children}
                </View>
                {/* Switch Bar */}
                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={() => onSwitchTab('Dashboard')}>
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/icons/dashboard.png')}
                                style={activeTab === 'Dashboard' ? styles.activeIcon : styles.iconImage}
                            />
                            <Text style={activeTab === 'Dashboard' ? styles.activeLabel : styles.label}>Dashboard</Text>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSwitchTab('Create')}>
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/icons/add.png')}
                                style={activeTab === 'Create' ? styles.activeIcon : styles.iconImage}
                            />
                            <Text style={activeTab === 'Create' ? styles.activeLabel : styles.label}>Create</Text>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSwitchTab('Inventory')}>
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/icons/inventorylist.png')}
                                style={activeTab === 'Inventory' ? styles.activeIcon : styles.iconImage}
                            />
                            <Text style={activeTab === 'Inventory' ? styles.activeLabel : styles.label}>Inventory</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
//     },
//     container: {flex: 1 },
//     tabItem: {
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     navBar: {
//         height: 60,
//         backgroundColor: '#74E8FF',
//         paddingHorizontal: 16,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     topRightButtons: { flexDirection: 'row' },
//     icon: { marginLeft: 12, fontSize:18 },
//     title: { fontSize: 24, fontWeight: 'bold' },
//     content: { flex: 1, padding: 16 },
//     bottomBar: {
//         height: 60,
//         backgroundColor: '#74E8FF',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center'
//     },
//     tab: { fontSize: 16 },
//     activeTab: { fontSize:16, fontWeight: 'bold', color: 'blue' },
//     iconImage: {
//         width: 24,
//         height: 24,
//         marginHorizontal: 8,
//         tintColor: 'white'
//     },
//     activeIcon: {
//         width: 24,
//         height: 24,
//         marginHorizontal: 8,
//         tintColor: 'black'
//     },
//     label: {
//         fontSize: 12,
//         color: 'white',
//         marginTop: 4
//     },
//     activeLabel: {
//         fontSize: 12,
//         color: 'black',
//         marginTop: 4
//     }
// });
