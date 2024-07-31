import {SafeAreaView, StyleSheet} from 'react-native';
import {SketchCanvasWithInteractionAndCustomization} from './src/canvas/canvas-with-interactivity-and-customizability';
import WelcomePage from './src/signin/wellcomePage';
import React from 'react';

const DrawPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvasWithInteractionAndCustomization />
    </SafeAreaView>
  );
};

export default function App() {
  return <DrawPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
