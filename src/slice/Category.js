import {createSlice} from '@reduxjs/toolkit';
import {getAllCategoriesThunk} from '../thunks/CategoryThunk';

const initialState = {
  loading: false,
  allCategories: [],
};

export const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCategoriesThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action?.payload?.resData;
      })
      .addCase(getAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
