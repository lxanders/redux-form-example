const fetchDemoData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const demoDataMock = {
                username: 'anyUsername',
                email: 'anyEmail@test.com',
                someCheckbox: true
            };

            return resolve(demoDataMock);
        }, 3000);
    });
};

const storeDemoData = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve();
        }, 3000);
    });
}

export default {
    fetchDemoData,
    storeDemoData
}
