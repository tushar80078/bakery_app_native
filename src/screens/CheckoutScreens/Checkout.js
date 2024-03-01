import {
  Button,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeFromCart,
  calculatePayablePrice,
  calculateDiscountPrice,
} from '../../slice/Cart';
import ProductCartCard from '../../components/Cards/ProductCartCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyListAnimation from '../../components/Animations/EmptyCartAnimation';
import {addRemoveCartProductsThunk} from '../../thunks/UserThunk';
import ModalComponent from '../../components/Modal/Modal';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const Checkout = ({navigation, route}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state?.Cart?.cartItems);
  const totalPrices = useSelector(state => state?.Cart?.totalPrice);
  const totalPayblePrice = useSelector(state => state?.Cart?.totalPayablePrice);
  const userInformation = useSelector(state => state?.User?.userInfo);
  const token = useSelector(state => state?.User?.token);

  const [componentCartItems, setComponentCartItems] = useState([]);

  const increaseCartItems = id => {
    dispatch(increaseCartItemQuantity({id: id}));
  };

  const decreaseCartItems = id => {
    dispatch(decreaseCartItemQuantity({id: id}));
  };

  const removeItemFromCart = async id => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      const resData = await dispatch(
        addRemoveCartProductsThunk({
          product_id: id,
          user_id: userInformation?.id,
          delete: true,
        }),
      );
    } else {
      dispatch(removeFromCart({id: id}));
    }
  };

  const navigateToCheckout = async () => {
    const isLoggedIn = await AsyncStorage.getItem('token');

    if (isLoggedIn) {
      navigation.push('Checkout');
    } else {
      navigation.push('Login', {screen: 'Checkout'});
    }
  };

  useEffect(() => {
    dispatch(calculatePayablePrice());
    dispatch(calculateDiscountPrice());
    setComponentCartItems(cartItems);
  }, [cartItems]);

  return (
    <View style={styles.CartScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryOrangeHex} />

      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EntypoIcons
            name="chevron-small-left"
            size={30}
            color={COLORS.primaryOrangeHex}
            style={styles.BackIcon}
          />
        </TouchableOpacity>
        <View style={styles.OrderSummaryContainer}>
          <Text style={styles.OrderSummaryContent}>Order Summary</Text>
        </View>
      </View>

      <FlatList
        // ref={ListRef}

        ListEmptyComponent={<EmptyListAnimation title={'Cart is Empty'} />}
        showsVerticalScrollIndicator={false}
        data={cartItems}
        contentContainerStyle={[styles.ScrollViewFlex]}
        // style={{marginBottom: tabBarHeight * 2.8}}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', item);
              }}>
              <ProductCartCard
                key={item.id}
                id={item.id}
                type={item.type}
                imagelink_square={item.imagelink_square}
                name={item.name}
                average_rating={item.average_rating}
                prices={item.prices}
                price_for={item.price_for}
                favourite={item.favourite}
                quantity={item.quantity}
                ratings_count={item.ratings_count}
                points={item.points}
                cartQuantity={item?.cartQuantity}
                increaseCartItems={id => increaseCartItems(id)}
                decreaseCartItems={id => decreaseCartItems(id)}
                removeItemFromCart={id => removeItemFromCart(id)}
              />
            </TouchableOpacity>
          );
        }}
      />

      {/* Check Out Container */}
      {cartItems?.length > 0 ? (
        <View style={[styles.CheckoutContainer]}>
          {/* Price Container */}
          <View style={styles.PriceContainer}>
            <View style={styles.SubTotalContainer}>
              <Text style={styles.SubtotalText}>
                $ {totalPrices.toFixed(2)}
              </Text>
            </View>
            <View style={styles.TotalValueCotainer}>
              <Text style={styles.TotalValueText}>
                $ {totalPayblePrice.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Button Container */}
          <TouchableOpacity
            style={styles.CheckoutButtonContainer}
            onPress={() => navigateToCheckout()}
            // onPress={() => setModalVisible(true)}
          >
            <Text style={styles.CheckoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}

      <ModalComponent>
        <Text>Hello</Text>
      </ModalComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  CartScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  HeaderContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_15,
    paddingHorizontal: SPACING.space_15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackIcon: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.primaryOrangeHex,
    backgroundColor: COLORS.primaryWhiteHex,
    marginRight: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OrderSummaryContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  OrderSummaryContent: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
  },
  ScrollViewFlex: {
    // flexGrow: 1,
  },
  HeaderBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  Heading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24 * 1.5,
    color: COLORS.primaryOrangeHex,
  },
  CheckoutContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryWhiteHex,
    padding: SPACING.space_18,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    borderTopColor: COLORS.secondaryLightGreyHex,
    borderTopWidth: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  PriceContainer: {},
  SubTotalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubtotalText: {
    fontFamily: FONTFAMILY.poppins_medium,
    textDecorationLine: 'line-through',
    fontSize: FONTSIZE.size_16,
  },
  TotalValueCotainer: {},
  TotalValueText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryDarkGreyHex,
  },
  CheckoutButtonContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_20,
    borderRadius: 30,
  },
  CheckoutText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default Checkout;
