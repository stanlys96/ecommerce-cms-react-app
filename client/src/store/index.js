import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import productReducer from './reducers/product';
import bannerReducer from './reducers/banner';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  banner: bannerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;