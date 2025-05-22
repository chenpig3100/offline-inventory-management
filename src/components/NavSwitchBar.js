import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import styles from '../constants/navSwitchBarStyles';
import HintOverlay from './HintOverlay';
import { getHasNewAnnouncements, setHasNewAnnouncements } from '../services/announcementStorage';

export default function MainLayOut({ children, onNavigateTop, onSwitchTab, activeTab }) {
  const [showHint, setShowHint] = useState(false);
  const [hasNewAnnouncements, setHasNew] = useState(false);

  // refs for all icons/buttons
  const hintRef = useRef();
  const announcementRef = useRef();
  const settingRef = useRef();
  const dashboardRef = useRef();
  const createRef = useRef();
  const inventoryRef = useRef();

  useEffect(() => {
    const checkNotification = async () => {
      const status = await getHasNewAnnouncements();
      setHasNew(status);
    };
    checkNotification();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.navBar}>
          <Text style={styles.title}>INEXLINK</Text>
          <View style={styles.topRightButtons}>
            <View ref={hintRef}>
              <TouchableOpacity onPress={() => setShowHint(true)}>
                <Image source={require('../assets/icons/help.png')} style={styles.iconImage} />
              </TouchableOpacity>
            </View>

            <View ref={announcementRef}>
              <TouchableOpacity
                onPress={async () => {
                  await setHasNewAnnouncements(false);
                  setHasNew(false);
                  onNavigateTop('Announcement');
                }}
              >
                <View style={{ position: 'relative' }}>
                  <Image source={require('../assets/icons/notification.png')} style={styles.iconImage} />
                  {hasNewAnnouncements && <View style={styles.badge} />}
                </View>
              </TouchableOpacity>
            </View>

            <View ref={settingRef}>
              <TouchableOpacity onPress={() => onNavigateTop('Setting')}>
                <Image source={require('../assets/icons/setting.png')} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>{children}</View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomBar}>
          <View ref={dashboardRef}>
            <TouchableOpacity onPress={() => onSwitchTab('Dashboard')}>
              <View style={styles.tabItem}>
                <Image
                  source={require('../assets/icons/dashboard.png')}
                  style={activeTab === 'Dashboard' ? styles.activeIcon : styles.iconImage}
                />
                <Text style={activeTab === 'Dashboard' ? styles.activeLabel : styles.label}>Dashboard</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View ref={createRef}>
            <TouchableOpacity onPress={() => onSwitchTab('Create')}>
              <View style={styles.tabItem}>
                <Image
                  source={require('../assets/icons/add.png')}
                  style={activeTab === 'Create' ? styles.activeIcon : styles.iconImage}
                />
                <Text style={activeTab === 'Create' ? styles.activeLabel : styles.label}>Create</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View ref={inventoryRef}>
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
      </View>

      {/* HintOverlay） */}
      {showHint && (
        <HintOverlay
          refs={{
            hintRef,
            announcementRef,
            settingRef,
            dashboardRef,
            createRef,
            inventoryRef,
          }}
          onClose={() => setShowHint(false)}
        />
      )}
    </SafeAreaView>
  );
}
