import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  findNodeHandle,
  Dimensions,
  InteractionManager
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function NewHintOverlay({ refs, onClose, insets }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [positions, setPositions] = useState([]);

  const steps = [
    { key: 'hintRef', message: 'This button is for some hints.' },
    { key: 'announcementRef', message: 'This button shows announcements.' },
    { key: 'settingRef', message: 'This button opens settings.' },
    { key: 'dashboardRef', message: 'Go to dashboard.' },
    { key: 'createRef', message: 'Create a new item.' },
    { key: 'inventoryRef', message: 'Access inventory list.' },
  ];

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const measureAll = async () => {
        await new Promise((r) => setTimeout(r, 100));
        const newPositions = await Promise.all(
          steps.map(({ key }) => measureView(refs[key]))
        );
        setPositions(newPositions);
      };
      measureAll();
    });
  }, []);

  const measureView = (ref) => {
    return new Promise((resolve) => {
      if (!ref?.current) {
        console.warn('Ref not ready:', ref);
        return resolve(null);
      } 
      const handle = findNodeHandle(ref.current);
      if (!handle) {
        console.warn('Handle not found for ref:', ref);
        return resolve(null);
      } 
      UIManager.measure(handle, (x, y, w, h, pageX, pageY) => {
        resolve({ x: pageX, y: pageY - (insets?.top || 0), width: w, height: h });
      });
    });
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onClose();
    }
  };

  const currentStep = steps[stepIndex];
  const pos = positions[stepIndex];
  if (!pos) return null;
  const isBottomBar = ['dashboardRef', 'createRef', 'inventoryRef'].includes(currentStep.key);
  const tooltipWidth = width * 0.7;
  const tooltipLeft = Math.max(12, Math.min(pos.x, width - tooltipWidth - 12));
  const tooltipTop = isBottomBar
  ? pos.y - 60 // 顯示在 icon 上方
  : pos.y + pos.height + 12; // 顯示在 icon 下方

  return (
    <TouchableWithoutFeedback onPress={nextStep}>
      <View style={styles.overlay}>
        {/* Dimming everything except the highlighted item */}
        <View style={styles.dimBackground} />

        {/* Highlighted item as a circle or box */}
        <View
          style={{
            position: 'absolute',
            top: pos.y - 6,
            left: pos.x,
            width: pos.width,
            height: pos.height + 12,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#00f',
            backgroundColor: 'rgba(255,255,255,0.15)',
            zIndex: 1001,
          }}
        />

        {/* Tooltip */}
        <View style={[styles.tooltip, { top: tooltipTop, left: tooltipLeft }]}>
          <Text style={styles.tooltipText}>{currentStep.message}</Text>
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  dimBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    maxWidth: width * 0.7,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1001,
  },
  tooltipText: {
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    zIndex: 1002,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});