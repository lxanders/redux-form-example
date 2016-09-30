import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import services from './services/index';

const enhanceStore = () => {
    const middlewares = applyMiddleware(thunk.withExtraArgument(services));

    return compose(
        middlewares,
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
}

const configureStore = () => createStore(rootReducer, enhanceStore());

export default configureStore;
