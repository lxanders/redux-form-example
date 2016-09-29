import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { types } from '../actions/index';

const foo = (state = {}, action) => {
    if (action.type === types.FOO_LOAD_SUCCESS) {
        return { ...action.fooData };
    }

    return state;
}

const reducers = combineReducers({
    form: formReducer,
    foo
});

export default reducers;
