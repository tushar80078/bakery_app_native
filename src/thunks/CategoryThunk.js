import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAxios} from '../helpers/axiosInterceptor';

export const getAllCategoriesThunk = createAsyncThunk(
  'getAllCategoriesThunk',
  async (model, thunkApi) => {
    try {
      let productResponse = await getAxios().get('category');
      return productResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
