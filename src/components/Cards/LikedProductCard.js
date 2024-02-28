import {
  Dimensions,
  Image,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LikeAnimation from '../Animations/LikeAnimation';

const LikedProductCard = ({
  id,
  type,
  imagelink_square,
  name,
  average_rating,
  prices,
  price_for,
  favourite,
  quantity,
  ratings_count,
  points,
  buttonPressHandler,
  isLiked,
}) => {
  const Card_Width = Dimensions.get('window').width;

  return (
    <View style={[styles.LikedProductContainer]}>
      {/* Image Container */}

      <View style={styles.ImageContainer}>
        <Image source={{uri: imagelink_square}} style={styles.ImageStyle} />
      </View>

      {/* Details Container */}

      <View style={styles.DetailsContainer}>
        <Text style={styles.ProductName}>{name}</Text>
        <View style={styles.SecondDetailsConatinar}>
          <Text style={styles.QuantityText}>{quantity} left</Text>
          <Text style={styles.QuantityText}>|</Text>
          <View style={styles.RatingContainer}>
            <AntDesign name="star" color={COLORS.primaryOrangeHex} size={17} />
            <Text style={styles.AverageText}>{average_rating.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.PriceContainer}>
          <Text style={styles.PriceText}>$</Text>
          <Text style={styles.PriceText}>{prices}</Text>
          <Text style={styles.PriceText2}> / {price_for}</Text>
        </View>
      </View>

      {/* Action Container */}

      <View style={styles.ActionContainer}>
        <TouchableOpacity style={styles.ImageBackground}>
          <LikeAnimation />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LikedProductCard;

const styles = StyleSheet.create({
  LikedProductContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_15,
    marginRight: SPACING.space_15,
    marginBottom: SPACING.space_18,
    marginTop: SPACING.space_12,
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 0.3,
    elevation: 5,
    shadowColor: COLORS.primaryOrangeHex,
  },
  ImageContainer: {
    paddingVertical: SPACING.space_15,
    paddingHorizontal: SPACING.space_12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: 80,
    height: 80,
  },
  DetailsContainer: {
    flexDirection: 'column',
    marginHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_10,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.4,
  },
  SecondDetailsConatinar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ActionContainer: {
    flexDirection: 'column',
    // marginVertical: SPACING.space_15,
    // paddingHorizontal: SPACING.space_10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  QuantityText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
  },
  RatingContainer: {
    flexDirection: 'row',
  },
  AverageText: {
    fontFamily: FONTFAMILY.poppins_regular,
    marginLeft: SPACING.space_2,
    fontSize: FONTSIZE.size_16,
  },
  ProductName: {
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.secondaryBlackRGBA,
    fontSize: FONTSIZE.size_20,
  },
  PriceContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_2,
    alignItems: 'center',
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
  },
  PriceText2: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
});
