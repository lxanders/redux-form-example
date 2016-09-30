import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { types } from '../actions/index';

const demoData = (state = {}, action) => {
    if (action.type === types.FETCH_DEMODATA_SUCCESS) {
        return { ...action.data };
    }

    return state;
}

const fetching = (state = false, action) => {
    if (action.type === types.FETCH_DEMODATA_REQUEST) {
        return true;
    } else if (action.type === types.FETCH_DEMODATA_SUCCESS || action.type === types.FETCH_DEMODATA_FAILURE) {
        return false;
    }

    return state;
};

const storing = (state = false, action) => {
    if (action.type === types.STORE_DEMODATA_REQUEST) {
        return true;
    } else if (action.type === types.STORE_DEMODATA_SUCCESS || action.type === types.STORE_DEMODATA_FAILURE) {
        return false;
    }

    return state;
};

const error = (state = null, action) => {
    if (action.type === types.FETCH_DEMODATA_REQUEST || action.type === types.FETCH_DEMODATA_SUCCESS) {
        return null;
    } else if (action.type === types.FETCH_DEMODATA_FAILURE) {
        return action.error.message;
    }

    return state;
};

const reducers = combineReducers({
    form: formReducer,
    demoData,
    fetching,
    storing,
    error
});

export default reducers;

export const getDemoData = (state) => state.demoData;
export const isFetching = (state) => state.fetching;
export const isStoring = (state) => state.storing;
export const hasError = (state) => state.error !== null;
