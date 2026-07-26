import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const authReducer = (state = { user: null, token: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT':
      return { user: null, token: null };
    default:
      return state;
  }
};

const propertyReducer = (state = { properties: [], loading: false }, action) => {
  switch (action.type) {
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertyReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
