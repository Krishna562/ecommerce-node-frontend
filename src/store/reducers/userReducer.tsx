import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export interface UserI {
  email: string;
  isAdmin: boolean;
  cart: Array<object>;
  dateJoined: string;
  _id: string;
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
  async ({ email, password, confirmPassword }: SignupPropsI, thunkApi) => {
    try {
      await axios.post("/signup", {
        email,
        password,
        confirmPassword,
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
  },
});

const userReducer = userSlice.reducer;

export const { setIsLoggedIn, setCurrentuser, setValidationErr } =
  userSlice.actions;

export default userReducer;
