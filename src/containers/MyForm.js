import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import FormInput from '../components/forms/FormInput';
import { loadData } from '../actions/index';

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

const doMySubmit = (event) => {
    event.preventDefault();
}

const fields = {
    username: { name: 'username', label: 'Username', type: 'text', disabled: false, required: true, component: FormInput },
    email: { name: 'email', label: 'Email', type: 'email', disabled: false, required: true, component: FormInput }
}

class MyForm extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <Form horizontal onSubmit={handleSubmit(doMySubmit)}>
                <Field {...fields.username} />
                <Field {...fields.email} />
                <div>
                    <button type='submit' disabled={submitting}>Submit</button>
                    <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    initialValues: state.foo
});

const mapDispatchToProps = {
    loadData
}

MyForm = reduxForm({
    form: 'myForm',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false
})(MyForm);

MyForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

export default MyForm;
