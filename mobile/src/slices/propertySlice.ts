import { createSlice } from '@reduxjs/toolkit';

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    savedProperties: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setSavedProperties: (state, action) => {
      state.savedProperties = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    saveProperty: (state, action) => {
      state.savedProperties.push(action.payload);
    },
    unsaveProperty: (state, action) => {
      state.savedProperties = state.savedProperties.filter(
        (prop) => prop._id !== action.payload
      );
    },
  },
});

export const {
  setProperties,
  setSavedProperties,
  setLoading,
  setError,
  saveProperty,
  unsaveProperty,
} = propertySlice.actions;
export default propertySlice.reducer;
