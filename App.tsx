import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {SketchCanvasWithInteractionAndCustomization} from './src/canvas/canvas-with-interactivity-and-customizability';
import WelcomePage from './src/signin/Login';
import {FIREBASE_AUTH} from './src/firebase/firebaseConfig';
import {onAuthStateChanged, User} from '@firebase/auth';

const DrawPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvasWithInteractionAndCustomization />
    </SafeAreaView>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null); // Giả sử bạn lấy Uid từ state hoặc props

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      console.log('user:', user);
      setUser(user);
    });
  }, []);

  return <>{user ? <DrawPage /> : <WelcomePage />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
