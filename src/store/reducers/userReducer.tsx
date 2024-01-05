import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { ProductI } from "./product";

export interface UserI {
  email: string;
  isAdmin: boolean;
  cart: Array<{
    productId: ProductI;
    qty: number;
    _id: string;
  }>;
  dateJoined: string;
  _id: string;
  username: string;
}

interface INIT_STATE_TYPE {
  isLoggedIn: boolean;
  isLoading: boolean;
  currentUser: UserI;
  err: object;
  allUsers: Array<UserI>;
}

const INITIAL_STATE: INIT_STATE_TYPE = {
  isLoggedIn: false,
  isLoading: true,
  currentUser: {
    email: "",
    isAdmin: false,
    cart: [],
    dateJoined: "",
    _id: "",
    username: "",
  },
  err: {},
  allUsers: [],
};

// GET CURRENT USER AND AUTH STATUS

export const fetchUserAndCheckAuth = createAsyncThunk(
  "user/fetchUserAndCheckAuth",
  async () => {
    const result = await axios.get("/isLoggedIn");
    return result.data;
  }
);

// LOGIN THUNK

interface LoginPropsI {
  email: string;
  password: string;
  username: string;
}

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginPropsI, thunkApi) => {
    try {
      const result = await axios.post("/login", {
        email,
        password,
      });
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const result = await axios.post("/logout");
  return result.data;
});

// SIGNUP THUNK

interface SignupPropsI extends LoginPropsI {
  confirmPassword: string;
}

export const signup = createAsyncThunk(
  "user/signup",
  async (
    { username, email, password, confirmPassword }: SignupPropsI,
    thunkApi
  ) => {
    try {
      await axios.post("/signup", {
        email,
        password,
        confirmPassword,
        username,
      });
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

// FORGOT PASS THUNK

export const sendPassResetReq = createAsyncThunk(
  "user/passResetReq",
  async (email: string, thunkApi) => {
    try {
      const result = await axios.post("/pass-reset-req", {
        email,
      });
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

interface ResetPasswordPropsI {
  newPassword: string;
  confirmNewPassword: string;
}

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { newPassword, confirmNewPassword }: ResetPasswordPropsI,
    thunkApi
  ) => {
    try {
      await axios.patch("/reset-password", {
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      });
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

// GET ALL USERS

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      const result = await axios.get("/admin/all-users");
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// CHANGE THE ROLE OF THE USER - ADMIN / USER

interface ChangeRolePropsI {
  userId: string;
  isAdminNow: boolean;
}

export const changeUserRole = createAsyncThunk(
  "user/changeUserRole",
  async ({ userId, isAdminNow }: ChangeRolePropsI) => {
    try {
      const result = await axios.patch(`/admin/change-role/${userId}`, {
        isAdminNow,
      });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

interface CartProdI {
  prod: ProductI;
  qty: number;
}

// ADD TO CART

export const addToCart = (prod: ProductI) => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  const cart = JSON.parse(localStorage.getItem("cart")!);
  const cartProduct = cart.find(
    (item: CartProdI) => item.prod._id === prod._id
  );
  // const newProduct = {
  //   productId: prod._id,
  //   qty: cartProduct ? cartProduct.  + 1 : 1,
  // };
  // const updatedCartItems = cartProduct
  //   ? user.cart.map((item) =>
  //       item.productId === cartProduct.productId ? newProduct : item
  //     )
  //   : [...user.cart, newProduct];
  // user.cart = updatedCartItems;
  // await user.save();
};

// export const addToCart = createAsyncThunk(
//   "user/addToCart",
//   async (id: string) => {
//     try {
//       const result = await axios.post(`/add-to-cart/${id}`);
//       return result.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// REMOVE FROM CART

// export const removeFromCart = createAsyncThunk(
//   "user/removeFromCart",
//   async (id) => {
//     try {
//       const result = await axios.delete(`/remove-from-cart/${id}`);
//       return result.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentuser: (state, action: PayloadAction<UserI>) => {
      state.currentUser = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setValidationErr: (state, action: PayloadAction<object>) => {
      state.err = action.payload;
    },
  },
  extraReducers(builder) {
    // FETCH USER AND CHECK AUTH

    builder.addCase(fetchUserAndCheckAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserAndCheckAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.currentUser;
      state.isLoggedIn = action.payload.isLoggedIn;
    });
    builder.addCase(fetchUserAndCheckAuth.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });

    // LOGIN USER

    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.err = action.payload;
      } else {
        state.err = action.error;
      }
    });

    // LOGOUT USER
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.err = action.error;
    });

    // GET ALL USERS
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload.allUsers;
    });

    // CHANGE ROLE
    builder.addCase(changeUserRole.fulfilled, (state, action) => {
      state.allUsers = action.payload.updatedUsers;
    });

    // ADD TO CART
    // builder.addCase(addToCart.fulfilled, (state, action) => {
    //   state.currentUser.cart = action.payload.updatedCartProducts;
    // });

    // REMOVE FROM CART
    // builder.addCase(removeFromCart.fulfilled, (state, action) => {
    //   state.currentUser.cart = action.payload.updatedCartProducts;
    // });
  },
});

const userReducer = userSlice.reducer;

export const { setIsLoggedIn, setCurrentuser, setValidationErr } =
  userSlice.actions;

export default userReducer;
