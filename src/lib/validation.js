import isEmail from 'validator/lib/isEmail';

const validateUsername = (username) => {
    let error;

    if (!username) {
        error = 'Required';
    } else if (username.length > 15) {
        error = 'Must be 15 characters or less';
    }

    return error;
}

const validateEmail = (email) => {
    let error;

    if (!email) {
        error = 'Required';
    } else if(!isEmail(email)) {
        error = 'Invalid email address';
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
