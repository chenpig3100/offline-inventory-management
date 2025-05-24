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
      UIManager.measure(handle, (x, y, w, h) => {
        //console.log("measureView", { x, y, w, h });
        resolve({ x, y, width: w, height: h });
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

  const tooltipLeft = Math.max(120, Math.min(pos.x - 30, width - width * 0.75));
  const tooltipTop = pos.y + pos.height + 10 > height - 100
    ? pos.y - 60
    : pos.y + pos.height + 30;

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
              top: pos.y + 15,
              left: pos.x + 295,
              width: pos.width - 2,
              height: pos.height + 8,
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
