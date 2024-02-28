import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileRoutes} from '../../helpers/PorfileRoutes';
import {resetCartForLogout} from '../../slice/Cart';
import {resetLikedProducts} from '../../slice/User';
import {useDispatch, useSelector} from 'react-redux';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import RequestLoginAnimation from '../../components/Animations/RequestLoginAnimation';

const ProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state?.User?.token);
  const userInformation = useSelector(state => state?.User?.userInfo);

  const checkUserIsLoggedIn = () => {
    if (!token) {
      navigation.push('Banner', {screen: 'Profile'});
    }
  };

  const logOutUserFunction = async () => {
    const logOut = await AsyncStorage.removeItem('token');
    dispatch(resetCartForLogout());
    dispatch(resetLikedProducts());
    ToastAndroid.showWithGravity(
      `Logged Out Successfully`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  useEffect(() => {
    checkUserIsLoggedIn();
  }, []);

  return token ? (
    <View style={styles.ProfileContainer}>
      <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
      <View style={styles.HeaderContainer}>
        <TouchableOpacity
          style={styles.BackButtonContainer}
          onPress={() => navigation.goBack()}>
          <EntypoIcons
            name="chevron-small-left"
            size={30}
            color={COLORS.secondaryGreyHex}
            style={styles.ArrowButton}
          />
        </TouchableOpacity>
        <View style={styles.ProfileHeadingCotnainer}>
          <Text style={styles.ProfileHeadingText}>Profile</Text>
        </View>
        <TouchableOpacity
          style={styles.LogoutHeaderContainer}
          onPress={() => logOutUserFunction()}>
          <Ionicons
            name="log-out-outline"
            size={25}
            style={styles.LogoutButton}
            color={COLORS.primaryBlackHex}
          />
        </TouchableOpacity>
      </View>

      {/* Image Container */}
      <View style={styles.ImageContainer}>
        <View style={styles.ImageContainer2}>
          {userInformation?.imageLink ? (
            <ImageBackground
              source={{uri: userInformation?.imageLink}}
              style={styles.UserImage}></ImageBackground>
          ) : (
            <View
              style={[
                styles.UserImage,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                },
              ]}>
              <FontAwesome6
                name="user-large"
                size={60}
                color={COLORS.secondaryOrange}
              />
            </View>
          )}
        </View>
      </View>

      {/* Edit Image Icon */}
      <TouchableOpacity style={styles.EditIconContainer}>
        <View style={styles.EditIconContainer2}>
          <View style={styles.EditIconContainer3}>
            <Feather
              name="edit"
              color={COLORS.secondaryOrange}
              size={17}
              style={styles.EditIcon}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* User Name */}
      <View style={styles.UserNameContainer}>
        <Text style={styles.UserNameText}>
          {userInformation?.first_name} {userInformation?.last_name}
        </Text>
      </View>

      {/* Account */}
      <View style={styles.AccountHeadingConainer}>
        <Text style={styles.AccountHeadingText}>ACCOUNT</Text>
      </View>

      {/* List */}
      <View style={styles.ListContainer}>
        <View style={styles.ListContainer2}>
          {ProfileRoutes?.map(item => {
            return (
              <TouchableOpacity key={item?.id} style={styles.ProfileListTouch}>
                <View style={styles.ListIconOneContainer}>
                  <Ionicons
                    name={item?.icon}
                    size={item?.size}
                    style={styles.ListIconOne}
                    color={COLORS.primaryOrangeHex}
                  />
                </View>

                <View style={styles.ListContainer3}>
                  <View style={styles.TitleContainer}>
                    <Text style={styles.ListTitleText}>{item?.title}</Text>
                  </View>
                  <View style={styles.ListIconTwoContainer}>
                    <FontAwesome
                      name="angle-right"
                      style={styles.ListIconTwo}
                      size={23}
                      color={COLORS.primaryGreyHex}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.LoginRequestContainer}>
      <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SPACING.space_10,
          paddingHorizontal: SPACING.space_15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EntypoIcons
            name="chevron-small-left"
            size={35}
            color={COLORS.primaryWhiteHex}
            style={{
              // borderWidth: 1,
              borderRadius: 100,
              backgroundColor: COLORS.primaryBlackHex,
            }}
          />
        </TouchableOpacity>
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.primaryBlackHex,
              fontFamily: FONTFAMILY.poppins_semibold,
              fontSize: FONTSIZE.size_28,
            }}>
            Bakery Paradise
          </Text>
        </View>
      </View>

      <View style={{flexGrow: 1, justifyContent: 'center'}}>
        <RequestLoginAnimation />
        <View style={styles.LoginButtonContainer}>
          <TouchableOpacity
            style={styles.ButtonTouchCont}
            onPress={() => navigation.push('Banner', {screen: 'Profile'})}>
            <Text style={styles.LoginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  LoginRequestContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
    justifyContent: 'space-between',
  },
  LoginButtonContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    justifyContent: 'center',
    alignItems: 'center',
  },

  LoginText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20 * 2,
    paddingVertical: SPACING.space_10,
  },

  ButtonTouchCont: {
    backgroundColor: COLORS.primaryBlackHex,
  },

  ProfileContainer: {
    flex: 1,
    paddingHorizontal: SPACING.space_15,
    backgroundColor: COLORS.primaryWhiteHex,
  },

  UserImage: {
    height: 100,
    width: 100,
  },

  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.space_12,
  },

  BackButtonContainer: {
    justifyContent: 'center',
  },

  ArrowButton: {
    borderWidth: 0.5,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: 100,
    padding: 4,
  },

  ProfileHeadingCotnainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  ProfileHeadingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryOrangeHex,
  },

  LogoutHeaderContainer: {
    justifyContent: 'center',
  },

  LogoutButton: {
    borderWidth: 0.5,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: 100,
    padding: 7,
  },

  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SPACING.space_18,
  },

  ImageContainer2: {
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.secondaryOrange,
  },

  EditIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -55,
  },
  EditIconContainer2: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  EditIconContainer3: {
    borderRadius: 100,
    borderColor: COLORS.secondaryOrange,
    borderWidth: 1,
    padding: 8,
    backgroundColor: COLORS.primaryWhiteHex,
  },

  EditIcon: {},

  UserNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.space_18,
  },

  UserNameText: {
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
  },

  ProfileListTouch: {
    flex: 1,
    flexGrow: 1,
  },

  AccountHeadingConainer: {
    paddingVertical: SPACING.space_10,
    marginLeft: SPACING.space_8,
  },

  AccountHeadingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
  },

  ListContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_8,
  },

  ListContainer2: {
    width: '100%',
  },

  ProfileListTouch: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: SPACING.space_10,
    paddingVertical: SPACING.space_18,
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_16,
    elevation: 3,
  },

  ListIconOneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: 100,
  },

  ListIconOne: {
    padding: 5,
  },

  ListContainer3: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  TitleContainer: {
    justifyContent: 'center',
    marginLeft: SPACING.space_18,
  },

  ListTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryBlackRGBA,
  },

  ListIconTwoContainer: {
    justifyContent: 'center',
  },

  ListIconTwo: {},

  // goBackStyles: {
  //   color: COLORS.primaryWhiteHex,
  //   fontSize: FONTSIZE.size_24,
  //   fontFamily: FONTFAMILY.poppins_medium,
  //   backgroundColor: COLORS.primaryBlackHex,
  //   padding: SPACING.space_16,
  //   marginBottom: SPACING.space_12,
  // },
  // Logout: {
  //   color: COLORS.primaryWhiteHex,
  //   fontSize: FONTSIZE.size_24,
  //   fontFamily: FONTFAMILY.poppins_medium,
  //   backgroundColor: COLORS.primaryOrangeHex,
  //   padding: SPACING.space_16,
  //   marginBottom: SPACING.space_12,
  // },
});
