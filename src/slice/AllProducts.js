import {createSlice} from '@reduxjs/toolkit';
import {getAllProductsThunk} from '../thunks/ProductThunk';
import {getSearchedProductThunk} from '../thunks/ProductThunk';

const initialState = {
  loading: false,
  allProductData: [],
  cartItems: [],
  searchingProducts: [],
};

export const allProductSlice = createSlice({
  name: 'All_Products',
  initialState,
  reducers: {
    addToCartItems: (state, action) => {
      let data = state?.cartItems?.filter((ele, i) => {
        return ele.id == action?.payload?.id;
      });

      if (data?.length != 0) {
        let increasing = state?.cartItems?.filter((ele, i) => {
          if (ele.id == action?.payload?.id) {
            ele.cartQuantity = 1;
            return ele;
          } else {
            return ele;
          }
        });
        state.cartItems = [...increasing];
      } else {
        state.cartItems = [
          ...state.cartItems,
          {...action.payload, cartQuantity: 1},
        ];
      }
    },

    addToCartFromDetails: (state, action) => {
      let data = state?.cartItems?.filter((ele, i) => {
        return ele.id == action?.payload?.id;
      });

      if (data?.length != 0) {
        let increasing = state?.cartItems?.filter((ele, i) => {
          if (ele.id == action?.payload?.id) {
            ele.cartQuantity = parseInt(action.payload.detailQuantity);
            if (ele.quantity < ele.cartQuantity) {
              ele.cartQuantity = ele.quantity;
              return ele;
            } else {
              return ele;
            }
          } else {
            return ele;
          }
        });
        state.cartItems = [...increasing];
      } else {
        state.cartItems = [
          ...state.cartItems,
          {...action.payload, cartQuantity: action.payload.detailQuantity},
        ];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllProductsThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductData = action?.payload?.resData;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSearchedProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSearchedProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchingProducts = action?.payload?.resData;
      })
      .addCase(getSearchedProductThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {addToCartItems, addToCartFromDetails} = allProductSlice.actions;

export default allProductSlice.reducer;
