import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const RequestLoginAnimation = ({title}) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../lottie/LoginRequest.json')}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLORS.primaryWhiteHex,
  },
  LottieStyle: {
    height: 450,
    // marginTop: 80,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default RequestLoginAnimation;
