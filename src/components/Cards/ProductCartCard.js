import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const ProductCartCard = ({
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
  navigation,
  route,
  cartQuantity,
  decreaseCartItems,
  increaseCartItems,
  removeItemFromCart,
}) => {
  return (
    <View style={styles.CardContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollFlex}>
        <View style={styles.FirstRow}>
          {/* Image */}
          <View style={styles.ImageContainer}>
            <Image
              source={{uri: imagelink_square}}
              style={styles.ProductImage}
            />
          </View>

          {/* Product Name */}
          <View style={styles.NameContainer}>
            {/* ProductNameContainer */}
            <View style={styles.ProductTextContainer}>
              <Text style={styles.ProdcutText}>{name}</Text>
            </View>

            {/* Rating and item lefts */}
            <View style={styles.RatingContainer}>
              <View style={styles.ItemLeftsContainer}>
                <Text style={styles.ItemLeftText}>{quantity} left</Text>
              </View>
              <View style={styles.DividerContainer}>
                <Text style={styles.DividerText}>|</Text>
              </View>
              <View style={styles.RatingTextContainer}>
                <AntDesign
                  name="star"
                  color={COLORS.primaryOrangeHex}
                  size={17}
                />
                <Text style={styles.Ratingext}>{average_rating}</Text>
              </View>
            </View>
          </View>

          {/* Delete Button Container */}

          <TouchableOpacity
            style={styles.DeleteButtonContainer}
            onPress={() => {
              removeItemFromCart(id);
            }}>
            <MaterialCommunityIcons
              name="delete-outline"
              color={COLORS.secondaryLightGreyHex}
              size={30}
            />
          </TouchableOpacity>
        </View>

        {/* Increase Descrase And Price Container */}

        <View style={styles.PriceAndQuantityContainer}>
          {/* Quantity Container */}
          <View style={styles.QuantityContainer}>
            <TouchableOpacity onPress={() => decreaseCartItems(id)}>
              <View style={styles.MinusSymbol}>
                <Octicons
                  name="dash"
                  color={COLORS.secondaryLightGreyHex}
                  size={18}
                />
              </View>
            </TouchableOpacity>

            <View>
              <Text style={styles.CartQuantityText}>{cartQuantity}</Text>
            </View>

            <TouchableOpacity onPress={() => increaseCartItems(id)}>
              <View style={styles.PlusSymbol}>
                <Octicons
                  name="plus"
                  color={COLORS.primaryOrangeHex}
                  size={18}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Price Container */}
          <View style={styles.PriceContainer}>
            <Text style={styles.DollarSign}>$</Text>
            <Text style={styles.ProductPrice}>{prices}</Text>
            <Text style={styles.PriceFor}>/{price_for}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderRadius: 15,
    marginHorizontal: SPACING.space_12,
    padding: SPACING.space_12,
    backgroundColor: COLORS.primaryWhiteHex,
    borderWidth: 0.3,
    borderColor: COLORS.primaryOrangeHex,
    marginTop: SPACING.space_8,
    elevation: 5,
    shadowColor: COLORS.primaryOrangeHex,
  },
  ScrollFlex: {
    flex: 1,
  },
  FirstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImageContainer: {
    padding: SPACING.space_10,
  },
  ProductImage: {
    width: 80,
    height: 80,
  },
  NameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ProductTextContainer: {},
  ProdcutText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryDarkGreyHex,
  },
  RatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ItemLeftsContainer: {},
  ItemLeftText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  DividerContainer: {},
  DividerText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  RatingTextContainer: {
    flexDirection: 'row',
  },
  Ratingext: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
    marginLeft: SPACING.space_2,
  },
  DeleteButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  PriceAndQuantityContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: SPACING.space_4,
    marginBottom: SPACING.space_8,
  },
  QuantityContainer: {
    flexDirection: 'row',
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 0.7,
    borderRadius: 50,
    // paddingHorizontal: SPACING.space_8,
    alignItems: 'center',
  },
  MinusSymbol: {
    paddingHorizontal: SPACING.space_12,
  },
  CartQuantityText: {
    fontFamily: FONTFAMILY.poppins_extrabold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_16,
  },
  PlusSymbol: {
    paddingHorizontal: SPACING.space_12,
  },
  PriceContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SPACING.space_16,
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
  },
  ProductPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
    paddingHorizontal: SPACING.space_4,
  },
  PriceFor: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
  },
});

export default ProductCartCard;
