import {createSlice} from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customer: null,
  },
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const {setCustomer} = customerSlice.actions;

export const selectCustomer = (state) => state.customer.customer;

export default customerSlice.reducer;
