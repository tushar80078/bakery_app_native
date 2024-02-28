import {createSlice} from '@reduxjs/toolkit';
import {
  signUpUserThunk,
  loginUserThunk,
  likeUnlikeProductThunk,
  addRemoveCartProductsThunk,
} from '../thunks/UserThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loading: false,
  userInfo: {},
  token: false,
  likedProducts: [],
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    isUserLoggedIn: (state, action) => {
      let token = AsyncStorage.getItem('token');

      if (token) {
        state.isUserLoggedIn = true;
      }
    },

    isProductLiked: (state, action) => {
      let liked = false;

      for (product in state.likedProducts) {
        if (product.id == action.payload) {
          liked = true;
          return;
        }
      }

      return liked;
    },

    resetLikedProducts: (state, action) => {
      state.likedProducts = [];
      state.token = false;
      state.userInfo = {};
    },
  },
  extraReducers: builder => {
    builder

      //------------- Login Thunk States --------------------

      .addCase(signUpUserThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUserThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signUpUserThunk.rejected, (state, action) => {
        state.loading = false;
      })

      //------------- Login Thunk States --------------------

      .addCase(loginUserThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        // ------------ Set User Info ---------------
        state.userInfo = action.payload.userInfo;

        // ------------ Set Token ---------------
        AsyncStorage.setItem('token', action.payload.token);

        // ------------ Set Logged In state ---------------
        state.token = action.payload.token;

        // ------------ Set Liked Products ---------------
        state.likedProducts = action.payload.likedProducts;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
      })

      //------------- Liked Unliked Thunk States --------------------

      .addCase(likeUnlikeProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likeUnlikeProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.likedProducts = action.payload.resData;
      })
      .addCase(likeUnlikeProductThunk.rejected, (state, action) => {
        state.loading = false;
      });

    // //------------- Add Remove Product In Cart Thunk States --------------------

    // .addCase(addRemoveCartProductsThunk.pending, (state, action) => {
    //   state.loading = true;
    // })
    // .addCase(addRemoveCartProductsThunk.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.cartProducts = action.payload.resData;
    // })
    // .addCase(addRemoveCartProductsThunk.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export const {isProductLiked, resetLikedProducts} = userSlice.actions;

export default userSlice.reducer;
