import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {SketchCanvasWithInteractionAndCustomization} from './src/canvas/canvas-with-interactivity-and-customizability';
import WelcomePage from './src/signin/Login';

const DrawPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvasWithInteractionAndCustomization />
    </SafeAreaView>
  );
};

export default function App() {
  const [uid, setUid] = useState<string | null>(null); // Giả sử bạn lấy Uid từ state hoặc props

  return <>{uid ? <DrawPage /> : <WelcomePage />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
