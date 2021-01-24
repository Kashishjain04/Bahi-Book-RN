/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {login, logout} from '../redux/userSlice';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import SocialButton from '../components/SocialButton';
import {configure} from '../utils/GoogleSignin';

const Auth = () => {
  const dispatch = useDispatch();
  const _isMounted = useRef(true);
  const [isLoading, setLoading] = useState(true);

  const googleLogin = () => {
    GoogleSignin.clearCachedAccessToken;
    GoogleSignin.signIn()
      .then(({idToken}) => {
        setLoading(true);
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredential);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    configure; //Imported from ../utils/GoogleSignin.js
    auth().onAuthStateChanged((user) => {
      if (user) {
        const obj = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        };
        _isMounted.current && dispatch(login(obj));
      } else {
        _isMounted.current && dispatch(logout());
      }
      _isMounted.current && setLoading(false);
    });
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return isLoading === true ? (
    <ActivityIndicator
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      size={Platform.OS === 'android' ? 50 : 'large'}
      color="#999"
    />
  ) : (
    <View style={styles.container}>
      <Image
        style={styles.iconStyle}
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/bahi-book.appspot.com/o/icon.png?alt=media&token=13344b24-3410-4047-957a-e6447432c4e7',
        }}
      />
      <Text style={styles.text}>Bahi Book</Text>
      <SocialButton
        buttonTitle="Continue with Google"
        btnType={'google'}
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={googleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconStyle: {
    marginTop: -30,
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 30,
    marginBottom: 50,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});

export default Auth;
