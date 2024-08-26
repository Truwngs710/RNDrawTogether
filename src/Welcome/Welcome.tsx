import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import {FIREBASE_AUTH} from '../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {
  BackGroundGradientColors,
  ButtonGradientColor,
} from '../constant/constant';

const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Phần logo và gradient */}
      {/* background */}
      <LinearGradient
        colors={BackGroundGradientColors}
        style={styles.header}></LinearGradient>

      {/* Phần text "Welcome" */}
      <Text style={styles.welcomeText}>Welcome !</Text>

      {/* Nút "Create Account" */}
      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient colors={ButtonGradientColor} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Nút "Login" */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Biểu tượng mạng xã hội */}
      <View style={styles.socialContainer}>
        <Image
          source={{uri: 'https://example.com/google-icon.png'}}
          style={styles.socialIcon}
        />
      </View>

      <Text style={styles.footerText}>Sign in with another account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: '800',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4c669f',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#4c669f',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  footerText: {
    color: '#aaa',
    marginTop: 20,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
