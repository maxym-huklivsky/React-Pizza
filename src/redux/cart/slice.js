import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const obj = {
  count: 2,
  id: 7,
  title: 'Маргарита',
  imageUrl:
    'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg',
  price: 900,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        const item = state.items[index];
        const count = item.count + 1;
        state.items[index] = { ...item, count, price: action.payload.price * count };
        return;
      }

      state.items.push({ count: 1, ...action.payload });
    },
    removePizza(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);

      state.items.splice(index, 1);
    },
    // increment(state, action) {
    //   const index = state.items.findIndex((item) => item.id === action.payload.id);
    //   const item = state.items[index];
    //   const count = item.count + 1;
    //   console.log(item.price, 'current');
    //   console.log(action.payload.price, 'static');
    //   state.items[index] = {
    //     ...item,
    //     count,
    //     price: action.payload.price * count,
    //   };
    // },
    // decrement(state, action) {
    //   const index = state.items.findIndex((item) => item.id === action.payload.id);
    //   const item = state.items[index];
    //   const count = item.count - 1;
    //   console.log(item.price, 'current');
    //   console.log(action.payload.price, 'static');
    //   state.items[index] = {
    //     ...item,
    //     count,
    //     price: action.payload.price * count,
    //   };
    // },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addPizza, removePizza, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
