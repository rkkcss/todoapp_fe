import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../utils/API";
import { APILogin } from "../utils/APILogin";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export type ChangeNameDTO = {
  firstName: string;
  lastName: string;
}

export type User = {
  id?: string;
  login?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  activated?: boolean;
  langKey?: string;
  createdDate?: Date;
  authorities?: [string];
};

export type State = {
  user: User | null;
  loading: boolean;
  error: boolean;
  msg: string | null;
  theme: string;
};

const initialState: State = {
  user: null,
  loading: false,
  error: false,
  msg: "",
  theme: "light",
};

export const getAccountInfo = createAsyncThunk<User>(
  "getAccountInfo",
  async () => {
    const response = await API.get<User>("/api/account");
    return response.data;
  }
);

export const loginUser = createAsyncThunk<FieldValues, User>(
  "loginUser",
  async (user, { dispatch }) => {
    await APILogin.post("/api/authentication", user);
    dispatch(getAccountInfo());
    return user;
  }
);

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  await API.post("/api/logout");
});

export const updateNameInfos = createAsyncThunk<FieldValues, FieldValues>("updateUser",
  async (userNames: FieldValues): Promise<FieldValues> => {
    console.log('userNames', userNames);
    const response = await API.post<string>("/api/profile/userinfo", userNames);
    toast.success(response.data);
    return userNames;
  },
);

const loginSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    loadingTrue(state) {
      state.loading = true;
    },
    loadingFalse(state) {
      state.loading = false;
    },
    toggleTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.msg = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.msg = String(action.error.message);
      })
      .addCase(getAccountInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAccountInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state: State) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(updateNameInfos.fulfilled, (state: State, action) => {
        return {
          ...state,
          user: state.user ? { ...state.user, ...action.payload } : null
        };
      });
  },
});

export const { loadingTrue, loadingFalse, toggleTheme } = loginSlice.actions;

export default loginSlice.reducer;
