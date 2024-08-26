import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {FIREBASE_AUTH} from '../../config/firebase/firebaseConfig';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      Alert.alert('Success', 'Sign Up Successful!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Sign Up Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      Alert.alert('Success', 'Sign In Successful!');
    } catch (err) {
      console.error('Lỗi Login: ' + err);
      Alert.alert('Error', 'Login Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Phần logo và gradient */}
      <LinearGradient colors={['#3a8ee6', '#6c50e0']} style={styles.header}>
        <Image
          source={{uri: 'https://example.com/logo.png'}}
          style={styles.logo}
        />
      </LinearGradient>

      {/* Phần "Welcome back!" */}
      <Text style={styles.welcomeText}>Welcome back !</Text>

      {/* Ô nhập Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Ô nhập Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Phần "Remember me" và "Forget password?" */}
      <View style={styles.optionsContainer}>
        <Text style={styles.rememberText}>Remember me</Text>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Forget password?</Text>
        </TouchableOpacity>
      </View>

      {/* Nút "Login" */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Phần "New user?" và "Sign Up" */}
      <TouchableOpacity style={styles.signUpContainer} onPress={handleSignUp}>
        <Text style={styles.newUserText}>New user?</Text>
        <Text style={styles.signUpText}> Sign Up</Text>
      </TouchableOpacity>

      {/* Phần "OR" */}
      <Text style={styles.orText}>OR</Text>

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
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
    marginVertical: 20,
  },
  input: {
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  rememberText: {
    color: '#555',
  },
  forgetPasswordText: {
    color: '#555',
  },
  loginButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#3a8ee6',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  newUserText: {
    color: '#888',
  },
  signUpText: {
    color: '#3a8ee6',
    fontWeight: 'bold',
  },
  orText: {
    color: '#888',
    marginVertical: 10,
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

export default LoginScreen;
