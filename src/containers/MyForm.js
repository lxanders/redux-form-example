import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import FormInput from '../components/forms/FormInput';
import { fetchDemoData, storeDemoData } from '../actions/index';
import { validateEmail, validateUsername, validate } from '../lib/validation';
import { getDemoData } from '../reducers/index';

const fieldDefinitions = {
    username: { name: 'username', label: 'Username', type: 'text', disabled: false, required: true, component: FormInput, validate: validateUsername },
    email: { name: 'email', label: 'Email', type: 'text', disabled: false, required: true, component: FormInput, validate: validateEmail },
    optionalField: { name: 'optionalField', label: 'Optional Field', type: 'text', disabled: false, required: false, component: FormInput },
    disabledField: { name: 'disabledField', label: 'Disabled Field', type: 'text', disabled: true, required: false, component: FormInput },
}

class MyForm extends React.Component {
    componentDidMount() {
        this.props.fetchDemoData();
    }

    saveFormData(data) {
        return this.props.storeDemoData(data);
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
                    <Button className='pull-left' bsStyle='primary' type='submit' disabled={submitting}>
                        {submitting ? <span><FontAwesome name='spinner' spin />&nbsp;</span> : null}
                        {submitSucceeded ? <span><FontAwesome name='check' />&nbsp;</span> : null}
                        Store data
                    </Button>
                    <Button className='pull-right' bsStyle='warning' disabled={pristine || submitting} onClick={reset}>
                        Reset data
                    </Button>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    initialValues: getDemoData(state)
});

const mapDispatchToProps = {
    fetchDemoData,
    storeDemoData
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
