import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FIREBASE_AUTH} from './src/firebase/firebaseConfig';
import {onAuthStateChanged, User} from '@firebase/auth';
import {SketchCanvasWithInteractionAndCustomization} from './src/canvas/canvas-with-interactivity-and-customizability';
import LoginScreen from './src/SignIn/SignIn';
import SignUpScreen from './src/SignUp/SignUp';
import WelcomeScreen from './src/Welcome/Welcome';

const Stack = createNativeStackNavigator();

const DrawPage: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <SketchCanvasWithInteractionAndCustomization />
  </SafeAreaView>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(user);
    });
    return unsubscribe; // Hủy đăng ký listener khi component bị unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Draw"
              component={DrawPage}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignUp"
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
