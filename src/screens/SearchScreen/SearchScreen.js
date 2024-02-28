import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import _, {debounce} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchedProductThunk} from '../../thunks/ProductThunk';

const SearchScreen = ({navigation, route}) => {
  const InputRef = useRef(null);
  const dispatch = useDispatch();
  const searchData = useSelector(
    state => state?.AllProducts?.searchingProducts,
  );

  const [serachText, setSearchText] = useState('');

  const handleSearchInputChange = async e => {
    const searchText = e;
    setSearchText(searchText);
    debouncedSave(searchText);
  };

  const debouncedSave = useCallback(
    debounce(nextValue => getSearchData(nextValue), 400),
    [],
  );

  const getSearchData = async nextValue => {
    if (nextValue != '') {
      dispatch(getSearchedProductThunk(nextValue));
    }
  };

  useEffect(() => {
    // InputRef.current.focus();
  }, []);

  return (
    <View style={styles.SearchScreenContainer}>
      {/* Search Bar */}

      <View style={styles.SearchBar}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EntypoIcons
              name="chevron-small-left"
              size={35}
              color={COLORS.primaryOrangeHex}
              style={styles.BackIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.InputContainer}>
          <TouchableOpacity>
            <IoniconsIcon
              name="search"
              size={22}
              color={COLORS.primaryOrangeHex}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Product..."
            placeholderTextColor={COLORS.primaryBlackRGBA}
            style={styles.TextInputContainer}
            ref={InputRef}
            onChangeText={text => handleSearchInputChange(text)}
          />
          <TouchableOpacity>
            <EntypoIcons
              name="cross"
              size={25}
              color={COLORS.primaryOrangeHex}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: 'row',
    marginVertical: SPACING.space_20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.space_15,
  },
  SearchScreenContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    flex: 1,
    paddingHorizontal: SPACING.space_12,
  },
  InputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_12,

    borderRadius: BORDERRADIUS.radius_15,
    alignItems: 'center',
    flexGrow: 1,
    marginLeft: SPACING.space_10,
  },

  TextInputContainer: {
    flex: 1,
    borderColor: COLORS.primaryBlackHex,
    width: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginLeft: SPACING.space_8,
    paddingVertical: SPACING.space_8,
  },

  BackIcon: {
    borderRadius: 100,
    backgroundColor: COLORS.primaryWhiteHex,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_2,
  },
});
