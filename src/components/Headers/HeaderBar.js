import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import UserImage from '../../assets/Images/UserImage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginAnimation from '../Animations/LoginAnimation';
import {useSelector} from 'react-redux';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const HeaderBar = ({navigation, route}) => {
  const token = useSelector(state => state?.User?.token);
  const userInformation = useSelector(state => state?.User?.userInfo);

  const [message, setMessage] = useState('');

  const getMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setMessage('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setMessage('Good Afternoon');
    } else {
      setMessage('Good Evening');
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <View style={styles.HeaderContainer}>
      <View style={styles.UserNameContainer}>
        <Text style={styles.UserName}>
          Hey {userInformation?.first_name} !!
        </Text>
        <Text style={styles.WelcomMessage}>{message}..</Text>
      </View>
      <View style={styles.UserSearchCotainer}>
        <View style={styles.SearchContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <IoniconsIcon
              name="search"
              size={20}
              color={COLORS.primaryWhiteHex}
              style={styles.IconSearch}
            />
          </TouchableOpacity>
        </View>
        <View>
          {token && (
            <TouchableOpacity
              style={styles.UserProfileContainer}
              onPress={() => navigation.push('Profile')}>
              {token ? (
                <Image source={UserImage} style={styles.UserImage} />
              ) : (
                <LoginAnimation />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    marginTop: SPACING.space_15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserNameContainer: {},
  UserName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  WelcomMessage: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackRGBA,
  },
  UserSearchCotainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.space_12,
  },
  IconSearch: {
    borderRadius: 100,
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_8,
    elevation: 2,
  },
  UserProfileContainer: {
    borderRadius: 100,
    borderColor: COLORS.primaryBlackHex,
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  UserImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 2,
  },
});

export default HeaderBar;
