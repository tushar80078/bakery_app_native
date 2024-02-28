import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAxios} from '../helpers/axiosInterceptor';

export const signUpUserThunk = createAsyncThunk(
  'signUpUserThunk',
  async (model, thunkApi) => {
    try {
      let userResponse = await getAxios().post('user/signup', {...model});

      return userResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  'loginUserThunk',
  async (model, thunkApi) => {
    try {
      let userResponse = await getAxios().post('user/login', {...model});
      return userResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const likeUnlikeProductThunk = createAsyncThunk(
  'likeUnlikeProduct',
  async (model, thunkApi) => {
    try {
      let productResponse = await getAxios().post('user/likedproducts', model);
      return productResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const addRemoveCartProductsThunk = createAsyncThunk(
  'addRemoveCartProductsThunk',
  async (model, thunkApi) => {
    try {
      let productResponse = await getAxios().post('user/cartproducts', {
        product_id: model?.product_id,
        user_id: model?.user_id,
      });
      return {
        ...productResponse.data,
        detailQuantity: model?.detailQuantity,
        delete: model?.delete == true ? true : false,
      };
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
