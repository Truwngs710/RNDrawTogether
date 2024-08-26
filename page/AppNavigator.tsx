// AppNavigator.tsx
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {onAuthStateChanged, User} from '@firebase/auth';
import {SketchCanvasWithInteractionAndCustomization} from './canvas/canvas-with-interactivity-and-customizability';
import LoginScreen from './signIn/SignIn';
import SignUpScreen from './signUp/SignUp';
import WelcomeScreen from './welcome/Welcome';
import {FIREBASE_AUTH} from '../config/firebase/firebaseConfig';
export type RootStackParamList = {
  Draw: undefined;
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawPage: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <SketchCanvasWithInteractionAndCustomization />
  </SafeAreaView>
);

const AppNavigator: React.FC = () => {
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
          <Stack.Screen
            options={{headerShown: false}}
            name="Draw"
            component={DrawPage}
          />
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignIn"
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
