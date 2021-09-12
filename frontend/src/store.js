import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {persistCombineReducers, persistStore} from 'redux-persist'
import rootReducer from './reducers/root-reducer';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export default () => {
    let store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    let persister = persistStore(store);

    return {store, persister}
}