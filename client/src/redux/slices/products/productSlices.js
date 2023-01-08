import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

const resetProductDelete = createAction("product/delete");
const resetProductEdit = createAction("product/reset");

export const createproductAction = createAsyncThunk(
  "product/created",
  async (product, { rejectWithValue, getState, dispatch }) => {
    console.log(product);
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("title", product?.title);
      formData.append("description", product?.description);
      formData.append("count", product?.count);
      formData.append("code", product?.code);
      formData.append("image", product?.image);

      const { data } = await axios.post(
        `${baseUrl}/api/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all posts
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async (code, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/products?code=${code}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete
export const deleteProductAction = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/products/${productId}`,
        config
      );
      dispatch(resetProductDelete());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update
export const updateProductAction = createAsyncThunk(
  "product/updated",
  async (product, { rejectWithValue, getState, dispatch }) => {
    console.log(product);
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/products/${product?.id}`,
        product,
        config
      );
      dispatch(resetProductEdit());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchProductDetailsAction = createAsyncThunk(
  "product/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/products/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {},
  extraReducers: (builder) => {
    //create product
    builder.addCase(createproductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createproductAction.fulfilled, (state, action) => {
      state.productCreated = action?.payload;
      state.loading = false;
      state.isCreated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createproductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch products
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.productLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Delete post
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetProductDelete, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.productUpdated = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update
    builder.addCase(updateProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetProductEdit, (state, action) => {
      state.isUpdated = true;
    });

    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.productUpdated = action?.payload;
      state.loading = false;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //details
    builder.addCase(fetchProductDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetailsAction.fulfilled, (state, action) => {
      state.productDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchProductDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default productSlice.reducer;
