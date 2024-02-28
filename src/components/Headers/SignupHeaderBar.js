import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';

const SignupHeaderBar = ({navigation, route}) => {
  return (
    <View style={styles.SignupHeaderBarContianer}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.BackArrowContainer}
        onPress={() => navigation.goBack()}>
        <EntypoIcons
          name="chevron-small-left"
          size={30}
          style={styles.BackArrow}
          color={COLORS.secondaryLightGreyHex}
        />
      </TouchableOpacity>

      {/* Bakery Name */}
      <View style={styles.BakeryNameContainer}>
        <Text style={styles.BakeryText}>Bakery Paradise</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  SignupHeaderBarContianer: {
    flexDirection: 'row',
    marginTop: SPACING.space_20,
    marginHorizontal: SPACING.space_15,
  },
  BackArrow: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: 100,
    padding: SPACING.space_2 * 2,
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 1,
  },
  BackArrowContainer: {
    justifyContent: 'center',
  },
  BakeryNameContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingLeft: SPACING.space_24 * 1.5,
  },
  BakeryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryGreyHex,
  },
});

export default SignupHeaderBar;
