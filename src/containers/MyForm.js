import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import FormInput from '../components/forms/FormInput';
import { loadData, saveData } from '../actions/index';
import { validateEmail, validateUsername, validate } from '../lib/validation';

const fieldDefinitions = {
    username: { name: 'username', label: 'Username', type: 'text', disabled: false, required: true, component: FormInput, validate: validateUsername },
    email: { name: 'email', label: 'Email', type: 'text', disabled: false, required: true, component: FormInput, validate: validateEmail },
    optionalField: { name: 'optionalField', label: 'Optional Field', type: 'text', disabled: false, required: false, component: FormInput },
    disabledField: { name: 'disabledField', label: 'Disabled Field', type: 'text', disabled: true, required: false, component: FormInput },
}

class MyForm extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    saveFormData(data) {
        return this.props.saveData(data);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props;

        return (
            <Form horizontal onSubmit={handleSubmit(this.saveFormData.bind(this))}>
                <Field {...fieldDefinitions.username} />
                <Field {...fieldDefinitions.email} />
                <Field {...fieldDefinitions.optionalField} />
                <Field {...fieldDefinitions.disabledField} />
                <div>
                    <button type='submit' disabled={submitting}>
                        {submitting ? <FontAwesome name='spinner' spin /> : null}
                        {submitSucceeded ? <FontAwesome name='check' /> : null}
                        {submitting || submitSucceeded ? ' Store data' : 'Store data'}
                    </button>
                    <button type='button' disabled={pristine || submitting} onClick={reset}>
                        Reset values
                    </button>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    initialValues: state.foo
});

const mapDispatchToProps = {
    loadData,
    saveData
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
