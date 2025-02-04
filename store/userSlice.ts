import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  avatar: string;
  orders: { id: number; status: string }[];
  notificationsEnabled: boolean;
  addresses: string[];
}

const initialState: UserState = {
  name: "Guest User",
  email: "guest@example.com",
  avatar: "https://via.placeholder.com/150",
  orders: [],
  notificationsEnabled: true,
  addresses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { updateProfile, clearUser } = userSlice.actions;

export default userSlice.reducer;
