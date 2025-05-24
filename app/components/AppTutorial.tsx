import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

const TUTORIAL_STORAGE_KEY = 'pnr_app_tutorial_shown';

const steps = [
  {
    title: 'Welcome to PNR Status Tracker',
    description: 'Track your Indian Railways journey with ease',
    image: require('@/assets/images/icon.png'),
  },
  {
    title: 'Check PNR Status',
    description: 'Enter your 10-digit PNR number to get detailed information about your booking',
    image: require('@/assets/images/icon.png'),
  },
  {
    title: 'Explore Trains',
    description: 'Browse trains, view schedules, and find information about various train routes',
    image: require('@/assets/images/icon.png'),
  },
  {
    title: 'Recent Searches',
    description: 'Quickly access your recently checked PNR numbers for easy tracking',
    image: require('@/assets/images/icon.png'),
  },
];

export const AppTutorial = () => {
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { width } = useWindowDimensions();

  const hideModal = async () => {
    setVisible(false);
    try {
      await AsyncStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    } catch (error) {
      console.error('Error saving tutorial status:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      hideModal();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View style={styles.container}>
          <View style={styles.stepsIndicator}>
            {steps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepDot,
                  currentStep === index ? styles.activeStepDot : null,
                ]}
              />
            ))}
          </View>
          
          <Image
            source={steps[currentStep].image}
            style={[styles.image, { width: width * 0.5 }]}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.description}>{steps[currentStep].description}</Text>
          
          <View style={styles.buttonContainer}>
            {currentStep > 0 ? (
              <Button
                mode="outlined"
                onPress={prevStep}
                style={styles.button}
              >
                Previous
              </Button>
            ) : (
              <View style={styles.buttonSpacer} />
            )}
            
            <Button
              mode="contained"
              onPress={nextStep}
              style={styles.button}
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
            </Button>
          </View>
          
          <Button
            mode="text"
            onPress={hideModal}
            style={styles.skipButton}
          >
            Skip Tutorial
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

// Custom hook to check if tutorial should be shown
export const useTutorial = () => {
  const [shouldShowTutorial, setShouldShowTutorial] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const checkTutorialStatus = async () => {
      try {
        const tutorialShown = await AsyncStorage.getItem(TUTORIAL_STORAGE_KEY);
        setShouldShowTutorial(tutorialShown !== 'true');
      } catch (error) {
        console.error('Error checking tutorial status:', error);
        setShouldShowTutorial(true);
      } finally {
        setLoading(false);
      }
    };

    checkTutorialStatus();
  }, []);

  return { shouldShowTutorial, loading };
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  stepsIndicator: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeStepDot: {
    backgroundColor: '#1A237E',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  image: {
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1A237E',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
  },
  buttonSpacer: {
    width: '45%',
  },
  skipButton: {
    marginTop: 20,
  },
});
