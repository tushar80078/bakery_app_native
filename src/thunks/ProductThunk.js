import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAxios} from '../helpers/axiosInterceptor';

export const getAllProductsThunk = createAsyncThunk(
  'getAllProductsThunk',
  async (model, thunkApi) => {
    try {
      let productResponse = await getAxios().get('products');
      return productResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const getSearchedProductThunk = createAsyncThunk(
  'getSearchedProductThunk',
  async (model, thunkApi) => {
    try {
      let productResponse = await getAxios().post('products/searchproduct', {
        searchString: model?.searchString,
      });

      return productResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
