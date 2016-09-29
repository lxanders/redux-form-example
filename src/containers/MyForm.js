import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors;
}

const renderField = ({ input, label, value, type, meta: { active, touched, error } }) => {
    const errorMessage = !active && touched && error && <span>{error}</span>;

    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} onFocus={input.onFocus} placeholder={label} type={type}/>
                {errorMessage}
            </div>
        </div>
    );
};

const doMySubmit = (event) => {
    event.preventDefault();
}

class MyForm extends React.Component {
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(doMySubmit)}>
                <Field name='username' type='text' component={renderField} label='Username'/>
                <Field name='email' type='email' component={renderField} label='Email'/>
                <div>
                    <button type='submit' disabled={submitting}>Submit</button>
                    <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        );
    }
}

MyForm = reduxForm({
    form: 'myForm',
    validate
})(MyForm);

MyForm = connect()(MyForm);

export default MyForm;
