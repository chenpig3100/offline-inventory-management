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

export default function HintOverlay({ refs, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [positions, setPositions] = useState([]);

  const steps = [
    { key: 'hintRef', message: 'This button is for some hints.' },
    { key: 'announcementRef', message: 'This button is for current announcement.' },
    { key: 'settingRef', message: 'This button is for setting.' },
    { key: 'dashboardRef', message: 'This button is for dashboard.' },
    { key: 'createRef', message: 'This button is for creating new items.' },
    { key: 'inventoryRef', message: 'This button is for inventory list.' },
  ];

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // 👉 加入這段：印出目前抓到的 ref 狀態
      /*
      steps.forEach(({ key }) => {
        const ref = refs[key];
        if (ref?.current) {
          const handle = findNodeHandle(ref.current);
          console.log(`✅ 測試 ref "${key}" 成功，handle:`, handle);
        } else {
          console.warn(`❌ ref "${key}" 沒抓到，位置量測將會失敗`);
        }
      });
      */
      const measureAll = async () => {
        await new Promise(r => setTimeout(r, 100));
        const newPositions = await Promise.all(
          steps.map(({ key }) => measureView(refs[key]))
        );
        setPositions(newPositions);
      };
      measureAll();
    })
    //setTimeout(measureAll, 200);
  }, []);

  const measureView = (ref) => {
    return new Promise((resolve) => {
      if (!ref?.current) return resolve(null);
      const handle = findNodeHandle(ref.current);
      if (!handle) return resolve(null);
      UIManager.measure(handle, (x, y, w, h, pageX, pageY) => {
        console.log("📏 measure", { x, y, w, h, pageX, pageY });
        resolve({ x: pageX, y: pageY, width: w, height: h });
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

  const tooltipLeft = Math.max(10, Math.min(pos.x, width - width * 0.7));
  const tooltipTop =
    pos.y + pos.height + 10 > height - 100
      ? pos.y - 120 // 若太接近底部就往上顯示
      : pos.y + pos.height + 20;

  return (
    <TouchableWithoutFeedback onPress={nextStep}>
      <View style={styles.overlay}>
        {/* dimbackground */}
        <View style={styles.dimBackground} />

        {/* highlightbox */}
        <View
          style={[
            styles.highlightBox,
            {
              top: pos.y - 65,             // 直接使用 pageY 結果
              left: pos.x - 5,
              width: pos.width + 10,
              height: pos.height + 10,
            },
          ]}
        />

        {/* tooltip */}
        <View style={[styles.tooltip, { top: tooltipTop, left: tooltipLeft }]}>
          <Text style={styles.tooltipText}>{currentStep.message}</Text>
        </View>

        {/* closebutton */}
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
  highlightBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00f',
    borderRadius: 6,
    backgroundColor: 'transparent',
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
    zIndex: 1000,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
