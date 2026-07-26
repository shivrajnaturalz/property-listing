import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const adminReducer = (state = { stats: null, users: [], properties: [] }, action) => {
  switch (action.type) {
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  admin: adminReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
