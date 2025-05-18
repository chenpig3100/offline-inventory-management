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
