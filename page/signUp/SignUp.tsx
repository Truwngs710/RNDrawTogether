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
import {createUserWithEmailAndPassword} from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {FIREBASE_AUTH} from '../../config/firebase/firebaseConfig';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

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

  return (
    <View style={styles.container}>
      {/* Phần logo và gradient */}
      <LinearGradient colors={['#3a8ee6', '#6c50e0']} style={styles.header}>
        <Image
          source={{uri: 'https://example.com/logo.png'}}
          style={styles.logo}
        />
      </LinearGradient>

      {/* Phần "Create Account" */}
      <Text style={styles.welcomeText}>Create Account</Text>

      {/* Ô nhập Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
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

      {/* Ô nhập Confirm Password */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Nút "Sign Up" */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Phần "Already have an account?" và "Login" */}
      <TouchableOpacity style={styles.loginContainer}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <Text style={styles.loginText}> Login</Text>
      </TouchableOpacity>
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
  signUpButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#3a8ee6',
    alignItems: 'center',
    marginVertical: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  alreadyText: {
    color: '#888',
  },
  loginText: {
    color: '#3a8ee6',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
