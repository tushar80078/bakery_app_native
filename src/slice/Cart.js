import {createSlice} from '@reduxjs/toolkit';
import {loginUserThunk, addRemoveCartProductsThunk} from '../thunks/UserThunk';

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalPayablePrice: 0,
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
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
    increaseCartItemQuantity: (state, action) => {
      let increasing = state?.cartItems?.filter((ele, i) => {
        if (ele.id == action?.payload?.id) {
          ele.cartQuantity = ele.cartQuantity + 1;
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
    },

    decreaseCartItemQuantity: (state, action) => {
      let increasing = state?.cartItems?.filter((ele, i) => {
        if (ele.id == action?.payload?.id) {
          ele.cartQuantity = ele.cartQuantity - 1;
          if (ele.cartQuantity <= 0) {
            return;
          } else {
            return ele;
          }
        } else {
          return ele;
        }
      });
      state.cartItems = [...increasing];
    },
    removeFromCart: (state, action) => {
      let removing = state?.cartItems?.filter((ele, i) => {
        if (ele.id == action?.payload?.id) {
          return;
        } else {
          return ele;
        }
      });
      state.cartItems = [...removing];
    },

    calculateDiscountPrice: (state, action) => {
      let totalPrice = 0;
      state?.cartItems?.map((ele, i) => {
        totalPrice = ele.prices * ele.cartQuantity + totalPrice;
      });
      state.totalPrice = totalPrice;
    },
    calculatePayablePrice: (state, action) => {
      let totalDiscountPrice = 0;
      state?.cartItems?.map((ele, i) => {
        let itemPayablePrice = ele.prices - (ele.prices * ele.discount) / 100;
        totalDiscountPrice =
          totalDiscountPrice + itemPayablePrice * ele.cartQuantity;
      });
      state.totalPayablePrice = totalDiscountPrice;
    },
    resetCartForLogout: (state, action) => {
      state.cartItems = [];
    },
  },
  extraReducers: builder => {
    builder
      //------------- Login Thunk States --------------------

      .addCase(loginUserThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        const cartProducts = action.payload.cartProducts.map(ele => ({
          ...ele,
          cartQuantity: 1,
        }));

        const updatedCartItems = [...cartProducts];

        for (let i = 0; i < state.cartItems.length; i++) {
          for (let j = 0; j < cartProducts.length; j++) {
            if (state.cartItems[i].id != cartProducts[j].id) {
              updatedCartItems.push(state.cartItems[i]);
            }
          }
        }

        state.cartItems = updatedCartItems;
      })

      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
      })

      //------------- Add Remove Product In Cart Thunk States --------------------

      .addCase(addRemoveCartProductsThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addRemoveCartProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        let cartDataWithQuantity = []; // Initialize the array to store cart items with quantity

        if (action?.payload?.delete != true) {
          for (let i = 0; i < state?.cartItems?.length; i++) {
            let foundInPayload = false; // Flag to check if the item is found in the payload

            // Check if the current item in state.cartItems exists in action.payload.resData
            for (let j = 0; j < action?.payload?.resData?.length; j++) {
              if (
                state?.cartItems?.[i]?.id === action?.payload?.resData?.[j]?.id
              ) {
                // If the item exists in the payload, add it to the cartDataWithQuantity array
                cartDataWithQuantity.push(state?.cartItems?.[i]);
                foundInPayload = true; // Set the flag to true
                break; // Break the loop since the item is found
              }
            }

            // If the item is not found in the payload, add it with the cartQuantity
            if (!foundInPayload) {
              cartDataWithQuantity.push({
                ...state?.cartItems?.[i],
                cartQuantity: action?.payload?.detailQuantity,
              });
            }
          }

          // Add the remaining items from action.payload.resData that are not already in the cart
          for (let k = 0; k < action?.payload?.resData?.length; k++) {
            let foundInCart = false;

            for (let l = 0; l < state?.cartItems?.length; l++) {
              if (
                action?.payload?.resData?.[k]?.id === state?.cartItems?.[l]?.id
              ) {
                foundInCart = true;
                break;
              }
            }

            if (!foundInCart) {
              cartDataWithQuantity.push({
                ...action?.payload?.resData?.[k],
                cartQuantity: action?.payload?.detailQuantity,
              });
            }
          }

          state.cartItems = cartDataWithQuantity;
        } else {
          const dataAfterDelete = state?.cartItems?.filter(ele => {
            return action?.payload?.resData?.some(item => {
              return ele.id === item.id;
            });
          });

          state.cartItems = dataAfterDelete;
        }
      })
      .addCase(addRemoveCartProductsThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  addToCartItems,
  addToCartFromDetails,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeFromCart,
  calculatePayablePrice,
  calculateDiscountPrice,
  resetCartForLogout,
} = cartSlice.actions;

export default cartSlice.reducer;
