import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export interface ProductI {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  images: Array<string>;
  reviews: Array<{
    stars: number;
    userId: string;
    comment: string;
  }>;
  userId?: string;
}

interface InitialStateI {
  categories: Array<string>;
  allProducts: Array<ProductI>;
  flashError: string;
  isLoading: boolean;
}

const INITIAL_STATE: InitialStateI = {
  categories: [],
  allProducts: [],
  flashError: "",
  isLoading: true,
};

// FETCH CATEGORIES

export const fetchCategories = createAsyncThunk(
  "product/getCategories",
  async () => {
    try {
      const result = await axios.get("/all-categories");
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// ADD NEW PRODUCT

export interface FormDataProductI
  extends Omit<ProductI, "images" | "reviews" | "_id"> {
  imgFiles: File[];
}

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data: FormDataProductI) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price.toString());
    formdata.append("stock", data.stock.toString());
    formdata.append("category", data.category);
    formdata.append("description", data.description);
    data.imgFiles.forEach((file) => formdata.append("imgFiles", file));

    const apiUrl =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_ONRENER_API_URL
        : import.meta.env.VITE_LOCAL_API_URL;

    try {
      const response = await fetch(`${apiUrl}/admin/add-product`, {
        method: "POST",
        body: formdata,
        credentials: "include",
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

// GET ALL PRODUCTS

export const getAllProducts = createAsyncThunk(
  "product/allProducts",
  async () => {
    try {
      const result = await axios.get("/all-products");
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// DELETE PRODUCT

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string, thunkApi) => {
    try {
      const result = await axios.delete(`/admin/delete-product/${productId}`);
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

// EDIT PRODUCT

interface EditProductParamsI {
  data: FormDataProductI;
  productId: string;
}

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ productId, data }: EditProductParamsI) => {
    const { name, price, stock, category, imgFiles, description } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category);
    formData.append("description", description);
    imgFiles.forEach((imgFile) => formData.append("imgFiles", imgFile));

    const apiUrl =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_ONRENER_API_URL
        : import.meta.env.VITE_LOCAL_API_URL;

    const response = await fetch(`${apiUrl}/admin/edit-product/${productId}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    const result = await response.json();
    return result;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {
    setFlashError: (state, action) => {
      state.flashError = action.payload;
    },
  },
  extraReducers(builder) {
    // FETCH CATEGORIES
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    });

    // ADD A NEW PRODUCT
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.allProducts.push(action.payload.newProduct);
    });

    // GET ALL PRODUCTS

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload.products;
    });

    // DELETE A PRODUCT

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.allProducts = action.payload.updatedProducts;
    });

    // EDIT A PRODUCT
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.allProducts = action.payload.updatedProducts;
    });
  },
});

export const { setFlashError } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
