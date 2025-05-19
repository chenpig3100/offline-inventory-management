import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const { width } = Dimensions.get('window');

const steps = [
  {
    message: 'This buttom is for some hints.',
    tooltipPos: { top: 100, right: 20 },
    highlightBox: { top: 60, right: 100, width: 36, height: 36 },
    
  },
  {
    message: 'This button is for current announcement.',
    tooltipPos: { top: 100, right: 70 },
    highlightBox: { top: 60, right: 59, width: 36, height: 36 },
  },
  {
    message: 'This button is for setting.',
    tooltipPos: { top: 100, right: 80 },
    highlightBox: { top: 60, right: 19, width: 36, height: 36 },
  },
  {
    message: 'This button is for Dashboard.',
    tooltipPos: { bottom: 100, left: 30 },
    highlightBox: { bottom: 55, left: 52, width: 36, height: 36 },
  },
  {
      message: 'This button is for Create new product.',
    tooltipPos: { bottom: 100, left: width / 2 - 120 },
    highlightBox: { bottom: 55, left: width / 2 -15, width: 36, height: 36 },
  },
  {
    message: 'This button is for Inventory list.',
    tooltipPos: { bottom: 100, right: 30 },
    highlightBox: { bottom: 55, right: 47, width: 36, height: 36 },
  },
];

export default function HintOverlay({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onClose();
    }
  };

  const { message, tooltipPos, highlightBox } = steps[stepIndex];

  return (
    <TouchableWithoutFeedback onPress={nextStep}>
      <View style={styles.overlay}>
        {/* dimbackground */}
        <View style={styles.dimBackground} />

        {/* highlightbox */}
        <View style={[styles.highlightBox, highlightBox]} />

        {/* tooltipPos */}
        <View style={[styles.tooltip, tooltipPos]}>
          <Text style={styles.tooltipText}>{message}</Text>
        </View>

        {/* closeButton */}
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  highlightBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00f',
    borderRadius: 8,
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
    top: 50,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
  },
  closeText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
