import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {StatusBar} from 'react-native';

const LoginBanner = ({navigation, route}) => {
  const screenName = route?.params?.screen;

  return (
    <View style={styles.LoginBanner}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ImageBackground
        source={require('../../assets/Images/Banner2.jpg')}
        blurRadius={7}
        style={styles.BackgrounImage}>
        {/* Heading */}
        <View style={styles.HeadingContainer}>
          <Text style={styles.BakeryName}>Bakery Paradise</Text>
        </View>

        <View style={styles.SecondContainer}>
          {/* Subtext */}
          <View style={styles.SubTextContainer}>
            <Text style={styles.SubText}>
              The aroma of coffee and the homemade bakery goods will make you
              feel at home
            </Text>
          </View>

          {/* Button Container */}
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={styles.LoginButtonContainer}
              onPress={() => {
                navigation.push('Login', {screen: screenName});
              }}>
              <Text style={styles.LoginButtonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.CreateButtonContainer}
              onPress={() => {
                navigation.push('Signup');
              }}>
              <Text style={styles.CreateAccountText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginBanner: {
    flex: 1,
  },
  BackgrounImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeadingContainer: {
    flex: 2,
    marginTop: SPACING.space_36 * 1.5,
  },
  BakeryName: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20 * 2,
  },
  SecondContainer: {
    flex: 1.5,
    justifyContent: 'space-around',
    paddingBottom: SPACING.space_28,
  },
  SubTextContainer: {
    marginHorizontal: SPACING.space_4,
  },
  SubText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_24,
  },
  ButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.space_18,
  },
  LoginButtonContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    width: '100%',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_25 * 2,
    marginBottom: SPACING.space_18,
  },
  LoginButtonText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_16,
    paddingVertical: SPACING.space_16,
  },
  CreateAccountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    paddingVertical: SPACING.space_18,
  },
  CreateButtonContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: '100%',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_25 * 2,
  },
});

export default LoginBanner;
