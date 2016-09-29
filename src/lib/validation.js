const validateUsername = (username) => {
    let error;

    if (!username) {
        return 'Required';
    } else if (username.length > 15) {
        return 'Must be 15 characters or less';
    }

    return error;
}

const validateEmail = (email) => {
    let error;

    if (!email) {
        return 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return 'Invalid email address';
    }

    return error;
}

const validate = (fieldDefinitions, values) => {
    const errors = {};

    Object.keys(fieldDefinitions).forEach((fieldName) => {
        const fieldDefinition = fieldDefinitions[fieldName];
        const value = values[fieldName];
        const error = fieldDefinition.required ? fieldDefinition.validate(value) : null;

        if (error) {
            errors[fieldName] = error;
        }
    });

    return errors;
}

export {
    validateEmail,
    validateUsername,
    validate
}
