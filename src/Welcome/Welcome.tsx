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

const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Phần logo và gradient */}
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}></LinearGradient>

      {/* Phần text "Welcome" */}
      <Text style={styles.welcomeText}>Welcome !</Text>

      {/* Nút "Create Account" */}
      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.button}>
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
          source={{uri: 'https://example.com/twitter-icon.png'}}
          style={styles.socialIcon}
        />
        <Image
          source={{uri: 'https://example.com/linkedin-icon.png'}}
          style={styles.socialIcon}
        />
        <Image
          source={{uri: 'https://example.com/facebook-icon.png'}}
          style={styles.socialIcon}
        />
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
    top: 0,
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 24,
    marginVertical: 20,
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
  },
  loginButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4c669f',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#4c669f',
    fontSize: 16,
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
  },
});

export default WelcomeScreen;
