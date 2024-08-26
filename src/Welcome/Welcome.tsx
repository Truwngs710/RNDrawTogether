import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../AppNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GoogleIcon} from '../constant/icons';
import {
  BackGroundGradientColors,
  ButtonGradientColor,
} from '../constant/constant';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const NativeToSignUp = () => {
    navigation.navigate('SignUp');
  };

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
      <TouchableOpacity onPress={NativeToSignUp} style={styles.buttonContainer}>
        <LinearGradient colors={ButtonGradientColor} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Nút "Login" */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Biểu tượng mạng xã hội */}
      <TouchableOpacity style={styles.socialContainer}>
        <GoogleIcon width={50} height={50} style={styles.socialIcon} />
      </TouchableOpacity>

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
