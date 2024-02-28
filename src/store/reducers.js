import {combineReducers} from '@reduxjs/toolkit';
import {allProductSlice} from '../slice/AllProducts';
import {categorySlice} from '../slice/Category';
import {userSlice} from '../slice/User';
import {cartSlice} from '../slice/Cart';

const rootReducer = combineReducers({
  AllProducts: allProductSlice.reducer,
  AllCategories: categorySlice.reducer,
  User: userSlice.reducer,
  Cart: cartSlice.reducer,
});

export default rootReducer;
