import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCartItems} from '../../slice/Cart';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import HeaderBar from '../../components/Headers/HeaderBar';
import CarouselComponent from '../../components/Carousel/Carousel';
import ProductCard from '../../components/Cards/ProductCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {getAllProductsThunk} from '../../thunks/ProductThunk';
import {getAllCategoriesThunk} from '../../thunks/CategoryThunk';
import LikedProductCard from '../../components/Cards/LikedProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addRemoveCartProductsThunk} from '../../thunks/UserThunk';

const HomeScreen = ({navigation, route}) => {
  // ---------------React Native Hooks -----------
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();

  // -------------- Global States ----------------
  const AllProductData = useSelector(
    state => state?.AllProducts?.allProductData,
  );
  const AllCategoryData = useSelector(
    state => state?.AllCategories?.allCategories,
  );

  const LikedProducts = useSelector(state => state?.User?.likedProducts);

  const cartProducts = useSelector(state => state?.Cart?.cartItems);

  const userInformation = useSelector(state => state?.User?.userInfo);

  // -------------- Component States ----------------
  const [activeCategory, setActiveCategory] = useState(0);

  // -------------- Helper Functions ---------------
  const filterStoreData = (category, ProductData) => {
    return ProductData?.filter(ele => {
      return ele.category == category;
    });
  };

  const addProductToCart = async item => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      const isProductAlreadyExistInCart = cartProducts?.filter(ele => {
        return ele.id == item.id;
      });

      if (isProductAlreadyExistInCart?.length > 0) {
        dispatch(addToCartItems(item));
        ToastAndroid.showWithGravity(
          `${item?.name} is Added to Cart`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        const resData = await dispatch(
          addRemoveCartProductsThunk({
            product_id: item?.id,
            user_id: userInformation?.id,
            delete: false,
            detailQuantity: 1,
          }),
        );

        if (resData) {
          ToastAndroid.showWithGravity(
            `${item?.name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }
    } else {
      dispatch(addToCartItems(item));
      ToastAndroid.showWithGravity(
        `${item?.name} is Added to Cart`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    // dispatch(addToCartItems(item));
    // ToastAndroid.showWithGravity(
    //   `${item?.name} is Added to Cart`,
    //   ToastAndroid.SHORT,
    //   ToastAndroid.CENTER,
    // );
  };

  // --------------- Life Cycle Methods ---------------

  useEffect(() => {
    dispatch(getAllProductsThunk());
    dispatch(getAllCategoriesThunk());
  }, []);

  return (
    <View style={styles.HomeScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* Header Bar */}
        <HeaderBar navigation={navigation} route={route} />

        {/* Carousel Component */}
        <CarouselComponent />

        {/* Your Favourite Products */}

        {LikedProducts?.length > 0 ? (
          <>
            <View style={styles.FavoritetHeadingContainer}>
              <Text style={styles.FavoriteProductTextHeding}>
                Your favourite products
              </Text>
            </View>
            <FlatList
              // ref={ListRef}
              horizontal
              ListEmptyComponent={
                <View style={styles.EmptyListContainer}>
                  <Text style={styles.CategoryText}>
                    No Liked Product's Available
                  </Text>
                </View>
              }
              showsHorizontalScrollIndicator={false}
              data={LikedProducts}
              contentContainerStyle={[styles.FlatListContainer]}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', item);
                    }}>
                    <LikedProductCard
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
                      isLiked={item.isLiked}
                      buttonPressHandler={() => addProductToCart(item)}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </>
        ) : (
          <></>
        )}

        {/* Category */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          <TouchableOpacity
            style={styles.CategoryCardContainer}
            onPress={() => {
              setActiveCategory(0);
            }}>
            <View
              style={
                activeCategory == 0
                  ? styles.CategoryCardActive
                  : styles.CategoryCard
              }>
              <Text
                style={
                  activeCategory == 0
                    ? styles.CategoryCardActiveText
                    : styles.CategoryCardText
                }>
                All
              </Text>
            </View>
          </TouchableOpacity>

          {AllCategoryData?.map((ele, i) => {
            return (
              <TouchableOpacity
                style={styles.CategoryCardContainer}
                key={ele.id}
                onPress={() => {
                  setActiveCategory(ele.id);
                }}>
                <View
                  style={
                    activeCategory == ele.id
                      ? styles.CategoryCardActive
                      : styles.CategoryCard
                  }>
                  <Text
                    style={
                      activeCategory == ele.id
                        ? styles.CategoryCardActiveText
                        : styles.CategoryCardText
                    }>
                    {ele.category}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* All Products List */}

        <FlatList
          // ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Product Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={AllProductData}
          contentContainerStyle={[styles.FlatListContainer]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', item);
                }}>
                <ProductCard
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
                  isLiked={item.isLiked}
                  buttonPressHandler={() => addProductToCart(item)}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* Bread List */}

        <View style={styles.ProductHeadingContainer}>
          <Text style={styles.ProductTextHeding}>Brades</Text>
        </View>

        <FlatList
          // ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Product Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={filterStoreData(1, AllProductData)}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginTop: -SPACING.space_10},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', item);
                }}>
                <ProductCard
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
                  isLiked={item.isLiked}
                  buttonPressHandler={() => addProductToCart(item)}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* Cake List */}

        <View style={styles.ProductHeadingContainer}>
          <Text style={styles.ProductTextHeding}>Cakes</Text>
        </View>

        <FlatList
          // ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Product Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={filterStoreData(2, AllProductData)}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight, marginTop: -SPACING.space_10},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', item);
                }}>
                <ProductCard
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
                  isLiked={item.isLiked}
                  buttonPressHandler={() => addProductToCart(item)}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreenContainer: {
    paddingHorizontal: SPACING.space_12,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  CategoryScrollViewStyle: {},
  CategoryCardContainer: {
    marginRight: SPACING.space_12,
  },
  CategoryCard: {
    borderColor: COLORS.secondaryLightGreyHex,
    borderWidth: 1.5,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_2 * 3,
    paddingHorizontal: SPACING.space_12,
  },
  CategoryCardActive: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_2 * 3,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    color: COLORS.primaryWhiteHex,
  },
  CategoryCardText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
  },
  CategoryCardActiveText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  FlatListContainer: {},
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 2,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ProductHeadingContainer: {
    marginTop: SPACING.space_16,
  },
  ProductTextHeding: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  FavoritetHeadingContainer: {
    marginTop: SPACING.space_10,
  },
  FavoriteProductTextHeding: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
});
