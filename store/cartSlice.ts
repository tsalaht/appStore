import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (item) state.totalAmount -= item.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
        const productId = action.payload;
        const itemToRemove = state.items.find(item => item.id === productId);
        if (itemToRemove) {
          state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        }
        state.items = state.items.filter(item => item.id !== productId);
      },
    clearCart: state => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, clearCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
