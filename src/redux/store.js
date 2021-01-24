import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import customerReducer from './customerSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
  },
});
