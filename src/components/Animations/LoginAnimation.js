import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const LoginAnimation = () => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../lottie/Login.json')}
        autoPlay
        loop
        speed={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    // flexGrow: 1,
    // justifyContent: 'center',
  },
  LottieStyle: {
    height: 55,
    width: 55,
  },
});

export default LoginAnimation;
