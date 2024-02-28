import {
  Dimensions,
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const Card_Width = Dimensions.get('window').width * 0.35;

const ProductCard = ({
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
  return (
    <View style={styles.ProductCartContainer}>
      {/* Image Container */}
      {/* <TouchableOpacity
        style={styles.ImageBackground}
        onPress={() => {
          console.log('Liked pressed');
        }}>
        <AntDesignIcons
          name={isLiked ? 'heart' : 'hearto'}
          size={24}
          color={isLiked ? COLORS.primaryOrangeHex : COLORS.secondaryGreyHex}
        />
      </TouchableOpacity> */}

      <ImageBackground
        source={{uri: imagelink_square}}
        style={styles.CardImageBG}
      />
      {/* Product Name */}
      <View style={styles.ProductNameContainer}>
        <Text style={styles.ProductName}>{name}</Text>
      </View>

      {/* Review Container */}
      <View style={styles.ReviewContainer}>
        <Text style={styles.QuantityText}>{quantity} left</Text>
        <Text style={styles.QuantityText}>|</Text>
        <View style={styles.RatingContainer}>
          <AntDesign name="star" color={COLORS.primaryOrangeHex} size={17} />
          <Text style={styles.AverageText}>{average_rating.toFixed(2)}</Text>
        </View>
      </View>

      {/* Price Container */}

      <View style={styles.PriceContainer}>
        <Text style={styles.PriceDollar}>$</Text>
        <Text style={styles.PriceText}>{prices}</Text>
        <Text style={styles.PriceUnitText}>/{price_for}</Text>
      </View>

      {/* Add To Cart Button */}

      {/* <TouchableOpacity
        style={styles.AddToCartContainer}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.AddToCartButton}>Add To Cart</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  ProductCartContainer: {
    borderRadius: BORDERRADIUS.radius_10,
    marginRight: SPACING.space_16,
    marginTop: SPACING.space_20,
    backgroundColor: 'white',
    borderColor: COLORS.primaryLightGreyHex,
    objectFit: 'cover',
    paddingHorizontal: SPACING.space_12,
    flex: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 0.5,
    elevation: 5,
    shadowColor: COLORS.primaryOrangeHex,
  },
  ImageBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: SPACING.space_10,
  },
  CardImageBG: {
    width: Card_Width,
    height: Card_Width,
  },
  LikeIcon: {},
  ProductNameContainer: {
    flex: 1,
    width: Card_Width,
  },
  ProductName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.secondaryBlackRGBA,
  },
  ReviewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_2,
    paddingTop: SPACING.space_2,
  },
  RatingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  QuantityText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  AverageText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    marginLeft: SPACING.space_4,
  },
  PriceContainer: {
    flexDirection: 'row',
    paddingTop: SPACING.space_2,
  },
  PriceDollar: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.secondaryBlackRGBA,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.secondaryBlackRGBA,
  },
  PriceUnitText: {
    marginLeft: SPACING.space_2,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
  },
  AddToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
    paddingVertical: SPACING.space_8,
    backgroundColor: COLORS.primaryOrangeHex,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    color: COLORS.primaryWhiteHex,
  },
  AddToCartButton: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});

export default ProductCard;
