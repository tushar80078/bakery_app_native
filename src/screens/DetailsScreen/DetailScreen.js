import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import ImageBG from '../../assets/Images/DetailsBG.jpeg';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCartFromDetails} from '../../slice/Cart';
import {
  likeUnlikeProductThunk,
  addRemoveCartProductsThunk,
} from '../../thunks/UserThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state?.User?.token);
  const likedProducts = useSelector(state => state?.User?.likedProducts);
  const cartProducts = useSelector(state => state?.Cart?.cartItems);
  const userInformation = useSelector(state => state?.User?.userInfo);
  const data = route.params;

  const [quantity, setQuantity] = useState(1);
  const [isProductLikedState, setIsProductLiked] = useState(false);

  const increaseQuantity = () => {
    if (quantity < data.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    const cartData = {...data, detailQuantity: quantity};

    const token = await AsyncStorage.getItem('token');

    if (token) {
      const isProductAlreadyExistInCart = cartProducts?.filter(ele => {
        return ele.id == data.id;
      });

      if (isProductAlreadyExistInCart?.length > 0) {
        dispatch(addToCartFromDetails(cartData));
        ToastAndroid.showWithGravity(
          `${data?.name} is Added to Cart`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        const resData = await dispatch(
          addRemoveCartProductsThunk({
            product_id: data?.id,
            user_id: userInformation?.id,
            detailQuantity: quantity,
          }),
        );

        if (resData) {
          ToastAndroid.showWithGravity(
            `${data?.name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }
    } else {
      dispatch(addToCartFromDetails(cartData));
      ToastAndroid.showWithGravity(
        `${data?.name} is Added to Cart`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const likeUnlikeProduct = async productId => {
    try {
      const loggedIn = await AsyncStorage.getItem('token');

      if (loggedIn) {
        const res = await dispatch(
          likeUnlikeProductThunk({
            product_id: productId,
            user_id: userInformation?.id,
          }),
        );

        if (res.payload) {
          setIsProductLiked(res.payload.liked == true ? true : false);
        }
      } else {
        navigation.push('Banner');
      }
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const checkLikeProductFromCart = async productId => {
    try {
      // --------- Checking Logged In
      const loggedIn = await AsyncStorage.getItem('token');
      if (loggedIn) {
        if (likedProducts?.length > 0) {
          for (let i = 0; i < likedProducts.length; i++) {
            if (likedProducts[i]?.id == productId) {
              setIsProductLiked(true);
              return true;
            }
          }
          return false;
        }
      }
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(() => {
    checkLikeProductFromCart(data?.id);
  }, [token]);

  return (
    <View style={styles.DetailsScreenContainer}>
      {/* Status Bar */}
      <StatusBar backgroundColor={COLORS.primaryOrangeHex} />

      {/* Scroll View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.ImageContainer}>
          {/*Background Image */}

          <ImageBackground source={ImageBG} style={styles.ItemBackgroundImage}>
            {/* Header */}
            <View style={styles.HeaderBar}>
              <TouchableOpacity
                style={styles.BackArrowContainer}
                onPress={() => navigation.pop()}>
                <EntypoIcons
                  name="chevron-small-left"
                  size={32}
                  color={COLORS.secondaryGreyHex}
                />
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={[styles.BackArrowContainer, {padding: 10}]}
                  onPress={() => likeUnlikeProduct(data?.id)}>
                  <AntDesignIcons
                    name={isProductLikedState ? 'heart' : 'hearto'}
                    size={24}
                    color={
                      isProductLikedState
                        ? COLORS.primaryRedHex
                        : COLORS.secondaryGreyHex
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Contents */}
            <View style={styles.ItemContentDescriptionContainer}>
              {/* Image Container */}
              <View style={styles.ImageContainer}>
                <Image
                  source={{uri: data.imagelink_square}}
                  style={styles.ItemImage}
                />
              </View>

              {/* Prodcut Name and rating */}
              <View style={styles.ProductNameContainer}>
                <Text style={styles.ProductName}>{data.name}</Text>
                <View style={styles.RatingContainer}>
                  <AntDesignIcons
                    name="star"
                    color={COLORS.primaryOrangeHex}
                    size={17}
                  />
                  <Text style={styles.AverageText}>
                    {data.average_rating} ({data.ratings_count})
                  </Text>
                </View>
              </View>

              {/* Other Info */}
              <View style={styles.SubInfoContainer}>
                <View style={styles.CategoryContainer}>
                  <Text
                    style={[styles.Infotext, {color: COLORS.primaryWhiteHex}]}>
                    {data.category_name}
                  </Text>
                </View>

                <View>
                  <Text style={styles.Infotext}>|</Text>
                </View>

                <View style={styles.ProductsLeftContainer}>
                  <MaterialIcons
                    name="signal-cellular-alt"
                    size={25}
                    color={COLORS.primaryLightGreyHex}
                  />
                  <Text
                    style={[styles.Infotext, {marginLeft: SPACING.space_4}]}>
                    {data.quantity} left
                  </Text>
                </View>

                <View>
                  <Text style={styles.Infotext}>|</Text>
                </View>

                <View style={styles.PointsContainer}>
                  <MaterialCommunityIcons
                    name="medal-outline"
                    size={24}
                    color={COLORS.primaryLightGreyHex}
                  />
                  <Text
                    style={[styles.Infotext, {marginLeft: SPACING.space_4}]}>
                    {data.points} Points
                  </Text>
                </View>
              </View>

              {/* Quantity and price container */}
              <View style={styles.PriceAndQuantityContainer}>
                {/* Quantity Container */}
                <View style={styles.QuantityContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      decreaseQuantity();
                    }}>
                    <View style={styles.MinusSymbol}>
                      <Octicons
                        name="dash"
                        color={COLORS.secondaryLightGreyHex}
                        size={23}
                      />
                    </View>
                  </TouchableOpacity>

                  <View>
                    <Text style={styles.CartQuantityText}>{quantity}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      increaseQuantity();
                    }}>
                    <View style={styles.PlusSymbol}>
                      <Octicons
                        name="plus"
                        color={COLORS.primaryOrangeHex}
                        size={22}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Price Container */}
                <View style={styles.PriceContainer}>
                  <Text style={styles.DollarSign}>$</Text>
                  <Text style={styles.ProductPrice}>{data.prices}</Text>
                  <Text style={styles.PriceFor}>/{data.price_for}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.DescriptionContainer}>
          {/* Add To Cart Button */}
          <TouchableOpacity
            style={styles.AddToCartButtonContainer}
            onPress={() => {
              addToCart();
            }}>
            <Text style={styles.AddToCartText}>Add To Cart</Text>
          </TouchableOpacity>
          <Text style={styles.DescriptionText}>
            {' '}
            &nbsp; &nbsp; &nbsp;{data.description}
          </Text>
          <Text style={styles.DescriptionText}>
            {' '}
            &nbsp; &nbsp; &nbsp;{data.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DetailsScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ItemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  ImageContainer: {
    overflow: 'hidden',
  },
  HeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.space_18,
    paddingHorizontal: SPACING.space_18,
  },
  BackArrowContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: 100,
    padding: SPACING.space_2 * 3,
  },
  ItemContentDescriptionContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_20,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  ItemImage: {
    height: 180,
    width: 180,
    marginTop: -100,
    borderRadius: 100,
  },
  ImageContainer: {
    alignItems: 'center',
  },
  ProductNameContainer: {
    flexDirection: 'column',
  },
  RatingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  AverageText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    marginLeft: SPACING.space_4,
    fontSize: FONTSIZE.size_14,
  },
  ProductName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryBlackHex,
  },
  ProductsLeftContainer: {
    flexDirection: 'row',
  },
  PointsContainer: {
    flexDirection: 'row',
  },
  SubInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_12,
  },
  Infotext: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
  CategoryContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_15,
    borderRadius: 50,
  },
  PriceAndQuantityContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.space_20,
  },
  QuantityContainer: {
    flexDirection: 'row',
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: SPACING.space_8,
    alignItems: 'center',
  },
  MinusSymbol: {
    paddingHorizontal: SPACING.space_16,
  },
  CartQuantityText: {
    fontFamily: FONTFAMILY.poppins_extrabold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_16,
  },
  PlusSymbol: {
    paddingHorizontal: SPACING.space_16,
  },
  PriceContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_24,
  },
  ProductPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_4,
  },
  PriceFor: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_20,
  },
  AddToCartButtonContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 50,
    padding: SPACING.space_8,
    marginHorizontal: SPACING.space_8,
  },
  AddToCartText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
  },
  DescriptionContainer: {
    paddingHorizontal: SPACING.space_12,
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
    marginTop: -SPACING.space_2 * 3,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    marginTop: SPACING.space_16,
    color: COLORS.secondaryBlackRGBA,
    paddingHorizontal: SPACING.space_12,
    textAlign: 'justify',
  },
});

export default DetailScreen;
