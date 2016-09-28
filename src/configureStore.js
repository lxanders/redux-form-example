import { createStore } from 'redux';
import rootReducer from './reducers/index';

const configureStore = () => createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

export default configureStore;
