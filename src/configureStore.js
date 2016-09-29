import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const enhanceStore = () => {
    const middlewares = applyMiddleware(thunk);

    return compose(
        middlewares,
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
}

const configureStore = () => createStore(rootReducer, enhanceStore());

export default configureStore;
