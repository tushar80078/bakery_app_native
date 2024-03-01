import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import LoginHeaderBar from '../../components/Headers/SignupHeaderBar';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {loginUserThunk} from '../../thunks/UserThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const screenParams = route?.params;
  const [passwordField, setPasswordField] = useState(false);
  const [userFields, setUserFields] = useState({
    email_id: 'tusharbhosale2281@gmail.com',
    password: '12345',
  });

  const submitUserInfo = async () => {
    try {
      const response = await dispatch(loginUserThunk(userFields));

      if (response?.payload?.success == true) {
        ToastAndroid.showWithGravity(
          `Logged In Successfully!!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );

        setUserFields({
          email_id: '',
          password: '',
        });

        if (screenParams?.screen) {
          navigation.replace(screenParams.screen);
        } else {
          navigation.pop(2);
        }
      }
    } catch (error) {
      console.log('Error : ', error);
      ToastAndroid.showWithGravity(
        `Error.!!!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  return (
    <View style={styles.LoginContainer}>
      {/* Status bar */}
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {/* Header Bar */}
      <LoginHeaderBar navigation={navigation} route={route} />

      {/* Create Account heading */}
      <View style={styles.WelcomeHeadingContainer}>
        <Text style={styles.WelcomeText}>Welcome back!</Text>
        <Text style={styles.WelcomeSubText}>Login to continue</Text>
      </View>

      {/* Signup Form */}
      <View style={styles.FormContainer}>
        {/* Email */}
        <View>
          <Text style={styles.FormLables}>Email</Text>
          <TextInput
            style={[styles.InputField]}
            keyboardType="email-address"
            value={userFields.email_id}
            onChangeText={text =>
              setUserFields({...userFields, email_id: text})
            }
          />
        </View>

        {/* Password */}
        <View>
          <Text style={styles.FormLables}>Password</Text>

          {/* Password Input */}
          <View style={styles.PasswordInputFieldContainer}>
            <TextInput
              style={[styles.PasswordInputField]}
              secureTextEntry={passwordField}
              value={userFields.password}
              onChangeText={text =>
                setUserFields({...userFields, password: text})
              }
            />

            {/* Eye Icons */}
            <TouchableOpacity
              onPress={() => {
                setPasswordField(!passwordField);
              }}>
              <FontAwesome5Icons
                size={20}
                color={COLORS.secondaryLightGreyHex}
                name={passwordField ? 'eye-slash' : 'eye'}
                style={styles.EyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Terms and policy */}
      <View style={styles.TermsConatainer}>
        <Text style={styles.TermsText}>
          By continue, you agree to our{' '}
          <Text style={styles.HilightText}>Terms of Service</Text> and &nbsp;
          <Text style={styles.HilightText}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Create Account Button */}
      <View style={styles.LoginButtonContainer}>
        <TouchableOpacity
          style={styles.TouchableContainer}
          onPress={() => submitUserInfo()}>
          <Text style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.LineViewContainer}>
        <View style={styles.LineView}></View>
        <View style={styles.OrTextContainer}>
          <Text style={styles.OrText}>or</Text>
        </View>
        <View style={styles.LineView}></View>
      </View>

      <View style={styles.IconsContainer}>
        <TouchableOpacity style={styles.GoogleIconContainer}>
          <Image
            source={require('../../assets/Images/GoogleLogo.png')}
            style={styles.GoogleStyle}
          />
          <View style={styles.IconTextContainer}>
            <Text style={styles.IconText}>Login with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.FBContainer}>
          <Image
            source={require('../../assets/Images/FacebookLogo.png')}
            style={styles.FBStyle}
          />
          <View style={styles.IconTextContainer}>
            <Text style={styles.IconText}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Login Text */}
      <View style={styles.LoginTextContainer}>
        <Text style={styles.LoginText}>
          Don't have account? <Text style={styles.LoginText2}>Sign up</Text>{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  WelcomeHeadingContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_15,
  },
  WelcomeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
  },
  WelcomeSubText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex,
  },
  PasswordInputFieldContainer: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 0.4,
    borderRadius: BORDERRADIUS.radius_10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  PasswordInputField: {
    flexGrow: 1,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    paddingHorizontal: SPACING.space_15,
  },
  EyeIcon: {
    marginHorizontal: SPACING.space_16,
  },
  InputField: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 0.4,
    borderRadius: BORDERRADIUS.radius_10,
    marginTop: SPACING.space_2,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    paddingHorizontal: SPACING.space_16,
  },
  FormContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_12,
  },
  FormLables: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_14,
    marginTop: SPACING.space_12,
  },
  PasswordInstructionsContainer: {
    paddingTop: SPACING.space_10,
    marginHorizontal: SPACING.space_8,
  },
  PasswordCase: {
    flexDirection: 'row',
    paddingTop: SPACING.space_4,
    alignItems: 'center',
  },
  PasswordInsText: {
    fontFamily: FONTFAMILY.poppins_regular,
    paddingLeft: SPACING.space_10,
  },
  TermsConatainer: {
    marginTop: SPACING.space_18,
    marginHorizontal: SPACING.space_30,
  },
  TermsText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryGreyHex,
  },
  HilightText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryOrange,
  },
  LoginButtonContainer: {
    marginTop: SPACING.space_18,
    marginHorizontal: SPACING.space_24,
  },
  TouchableContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 100,
    paddingVertical: SPACING.space_10,
  },
  ButtonText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_20,
  },
  LoginTextContainer: {
    marginHorizontal: SPACING.space_28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.space_28,
  },
  LoginText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryGreyHex,
  },
  LoginText2: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryOrange,
  },
  LineViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.space_24,
    marginVertical: SPACING.space_20,
  },
  LineView: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 0.2,
    flexGrow: 1,
    height: 0,
  },
  OrTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  OrText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    paddingHorizontal: SPACING.space_10,
  },
  GoogleStyle: {
    height: 25,
    width: 25,
  },
  FBStyle: {
    height: 25,
    width: 25,
  },
  IconsContainer: {
    flexDirection: 'column',
    gap: 10,
    marginHorizontal: SPACING.space_28,
  },
  GoogleIconContainer: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 0.5,
    borderRadius: 50,
    padding: SPACING.space_12,
    flexDirection: 'row',
  },
  FBContainer: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 0.5,
    borderRadius: 50,
    padding: SPACING.space_12,
    flexDirection: 'row',
  },
  IconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  IconText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
});

export default Login;
