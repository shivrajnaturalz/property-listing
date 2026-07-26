import { configureStore } from '@reduxjs/toolkit';

const authSlice = require('./slices/authSlice').default;
const propertySlice = require('./slices/propertySlice').default;

const store = configureStore({
  reducer: {
    auth: authSlice,
    properties: propertySlice,
  },
});

export default store;
