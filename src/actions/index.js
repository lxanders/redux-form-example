const types = {
    FOO_LOAD_REQUEST: 'FOO_LOAD_REQUEST',
    FOO_LOAD_SUCCESS: 'FOO_LOAD_SUCCESS',
    FOO_LOAD_FAILURE: 'FOO_LOAD_FAILURE'
}

const loadData = () => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.FOO_LOAD_REQUEST });

        setTimeout(() => {
            const fooFakeData = {
                username: 'anyUsername',
                email: 'anyEmail'
            };

            return Promise.resolve(dispatch({ type: types.FOO_LOAD_SUCCESS, fooData: fooFakeData }));
        }, 5000);
    };
};

export {
    types,
    loadData
};
