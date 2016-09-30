const types = {
    FETCH_DEMODATA_REQUEST: 'FETCH_DEMODATA_REQUEST',
    FETCH_DEMODATA_SUCCESS: 'FETCH_DEMODATA_SUCCESS',
    FETCH_DEMODATA_FAILURE: 'FETCH_DEMODATA_FAILURE',
    STORE_DEMODATA_REQUEST: 'STORE_DEMODATA_REQUEST',
    STORE_DEMODATA_SUCCESS: 'STORE_DEMODATA_SUCCESS',
    STORE_DEMODATA_FAILURE: 'STORE_DEMODATA_FAILURE'
}

const fetchDemoData = () => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.FETCH_DEMODATA_REQUEST });

        return services.fetchDemoData()
        .then((data) => dispatch({ type: types.FETCH_DEMODATA_SUCCESS, data }))
        .catch((error) => dispatch({ type: types.FETCH_DEMODATA_FAILURE, error }));
    };
};

const storeDemoData = (data) => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.STORE_DEMODATA_REQUEST });

        return services.storeDemoData(data)
        .then(() => dispatch({ type: types.STORE_DEMODATA_SUCCESS }))
        .catch((error) => dispatch({ type: types.STORE_DEMODATA_FAILURE, error }));
    };
}

export {
    types,
    fetchDemoData,
    storeDemoData
};
