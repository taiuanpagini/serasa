import { combineReducers, createStore, compose } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import usuarioReducer from './reducers/usuarioReducer';

const reducer = combineReducers({
  usuario: usuarioReducer
});

const store = createStore(
  reducer, devToolsEnhancer({ realtime: true })
);

export default store;
