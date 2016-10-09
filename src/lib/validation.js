import isEmail from 'validator/lib/isEmail';

const validateText = (text) => !text || text.length === 0 ? 'Required' : undefined;

const validateUsername = (username) => {
    let error;

    if (!username) {
        error = 'Required';
    } else if (username.length > 15) {
        error = 'Must be 15 characters or less';
    }

    return error;
};

const validateEmail = (email) => {
    let error;

    if (!email) {
        error = 'Required';
    } else if(!isEmail(email)) {
        error = 'Invalid email address';
    }

    return error;
};

const validate = (fieldDefinitions, values) => {
    const errors = {};

    fieldDefinitions.forEach((fieldDefinition) => {
        const value = values[fieldDefinition.name];
        const error = fieldDefinition.required ? fieldDefinition.validate(value) : null;

        if (error) {
            errors[fieldDefinition.name] = error;
        }
    });

    return errors;
};

export {
    validateText,
    validateEmail,
    validateUsername,
    validate
}
