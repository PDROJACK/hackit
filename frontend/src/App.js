import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {useEffect} from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { PersistGate } from "redux-persist/integration/react";
import Theatre from "./components/Theatre";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from "./reducers/root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {v4 as uuidv4 } from 'uuid'
import TheatreRouter from "./routers/TheatreRouter";


// let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// let {store, persister} = factory();

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persister = persistStore(store);

const App = () => {

  useEffect(() => {
    if(!localStorage.getItem("user")){
      localStorage.setItem("user", uuidv4());
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <TheatreRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
