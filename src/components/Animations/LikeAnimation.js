import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const LikeAnimation = () => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../../lottie/Liked.json')}
        autoPlay
        loop
        speed={0.4}
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
    height: 70,
    width: 70,
  },
});

export default LikeAnimation;
