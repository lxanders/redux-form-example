const types = {
    FOO_LOAD_REQUEST: 'FOO_LOAD_REQUEST',
    FOO_LOAD_SUCCESS: 'FOO_LOAD_SUCCESS',
    FOO_LOAD_FAILURE: 'FOO_LOAD_FAILURE',
    FOO_SAVE_REQUEST: 'FOO_SAVE_REQUEST',
    FOO_SAVE_SUCCESS: 'FOO_SAVE_SUCCESS',
    FOO_SAVE_FAILURE: 'FOO_SAVE_FAILURE'
}

const loadData = () => {
    return (dispatch) => {
        dispatch({ type: types.FOO_LOAD_REQUEST });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const fooFakeData = {
                    username: 'anyUsername',
                    email: 'anyEmail@test.com'
                };

                return resolve(dispatch({ type: types.FOO_LOAD_SUCCESS, fooData: fooFakeData }));
            }, 3000);
        });
    };
};

const saveData = (data) => {
    return (dispatch) => {
        dispatch({ type: types.FOO_SAVE_REQUEST, data });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(dispatch({ type: types.FOO_SAVE_SUCCESS }));
            }, 3000);
        });
    };
}

export {
    types,
    loadData,
    saveData
};
