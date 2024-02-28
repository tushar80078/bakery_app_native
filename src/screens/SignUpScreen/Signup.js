import {
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
import SignupHeaderBar from '../../components/Headers/SignupHeaderBar';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {signUpUserThunk} from '../../thunks/UserThunk';
import {useDispatch} from 'react-redux';

const Signup = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [passwordField, setPasswordField] = useState(true);
  const [userFields, setUserFields] = useState({
    phone_number: '',
    email_id: '',
    password: '',
    role: 'User',
  });

  const submitUserInfo = async () => {
    try {
      const response = await dispatch(signUpUserThunk(userFields));

      if (response?.payload?.success == true) {
        ToastAndroid.showWithGravity(
          `User Created Successfully! Login Please.`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );

        setUserFields({
          phone_number: '',
          email_id: '',
          password: '',
          role: 'User',
        });

        navigation.replace('Login');
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        `Error.!!!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  return (
    <View style={styles.SignupContainer}>
      {/* Status bar */}
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {/* Header Bar */}
      <SignupHeaderBar navigation={navigation} route={route} />

      {/* Create Account heading */}
      <View style={styles.CreateAccountHeadingContainer}>
        <Text style={styles.CreateAccountText}>Create Account</Text>
        <Text style={styles.SignupSubText}>Signup to continue</Text>
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

        {/* Phone number */}
        <View>
          <Text style={styles.FormLables}>Mobile Number</Text>
          <TextInput
            style={[styles.InputField]}
            keyboardType="decimal-pad"
            value={userFields.phone_number}
            onChangeText={text =>
              setUserFields({...userFields, phone_number: text})
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
                name={passwordField ? 'eye' : 'eye-slash'}
                style={styles.EyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Password Rules */}
          <View style={styles.PasswordInstructionsContainer}>
            <View style={styles.PasswordCase}>
              <FontAwesome5Icons
                size={17}
                color={COLORS.secondaryLightGreyHex}
                name={'dot-circle'}
              />
              <Text style={styles.PasswordInsText}>At least 8 characters</Text>
            </View>
            <View style={styles.PasswordCase}>
              <FontAwesome5Icons
                size={17}
                color={COLORS.secondaryLightGreyHex}
                name={'dot-circle'}
              />
              <Text style={styles.PasswordInsText}>
                Include special characters
              </Text>
            </View>
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
      <View style={styles.CreateAccountButtonContainer}>
        <TouchableOpacity
          style={styles.TouchableContainer}
          onPress={() => submitUserInfo()}>
          <Text style={styles.ButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Login Text */}
      <View style={styles.LoginTextContainer}>
        <Text style={styles.LoginText}>
          Already a member? <Text style={styles.LoginText2}>Log in</Text>{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SignupContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  CreateAccountHeadingContainer: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_20,
  },
  CreateAccountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
  },
  SignupSubText: {
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
    fontSize: FONTSIZE.size_14,
    paddingHorizontal: SPACING.space_16,
    color: COLORS.primaryBlackHex,
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
  CreateAccountButtonContainer: {
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
    marginTop: SPACING.space_20,
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
});

export default Signup;
