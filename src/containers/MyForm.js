import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import FormInput from '../components/forms/FormInput';
import { loadData } from '../actions/index';
import { validateEmail, validateUsername, validate } from '../lib/validation';

const fieldDefinitions = {
    username: { name: 'username', label: 'Username', type: 'text', disabled: false, required: true, component: FormInput, validate: validateUsername },
    email: { name: 'email', label: 'Email', type: 'text', disabled: false, required: true, component: FormInput, validate: validateEmail },
    optionalField: { name: 'optionalField', label: 'Optional Field', type: 'text', disabled: false, required: false, component: FormInput },
    disabledField: { name: 'disabledField', label: 'Disabled Field', type: 'text', disabled: true, required: false, component: FormInput },
}

const doMySubmit = (event) => {
    event.preventDefault();
}

class MyForm extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <Form horizontal onSubmit={handleSubmit(doMySubmit)}>
                <Field {...fieldDefinitions.username} />
                <Field {...fieldDefinitions.email} />
                <Field {...fieldDefinitions.optionalField} />
                <Field {...fieldDefinitions.disabledField} />
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
    validate: validate.bind(null, fieldDefinitions),
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false
})(MyForm);

MyForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

export default MyForm;
