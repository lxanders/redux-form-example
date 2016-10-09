import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Form, Button, Checkbox } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Loader from 'react-loader';
import FormInput from '../components/forms/FormInput';
import FormSelect from '../components/forms/FormSelect';
import FormCheckbox from '../components/forms/FormCheckbox';
import { fetchDemoData, storeDemoData } from '../actions/index';
import { validateText, validateSelect, validateCheckbox, validateEmail, validateUsername, validate } from '../lib/validation';
import { getDemoData, isFetching } from '../reducers/index';

const options = [
    { value: '', label: 'Select Something' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
];

const generalFieldDefinitions = [
    { name: 'username', label: 'Username', type: 'text', disabled: false, required: true, component: FormInput, validate: validateUsername },
    { name: 'email', label: 'Email', type: 'text', disabled: false, required: true, component: FormInput, validate: validateEmail },
    { name: 'selectSomething', label: 'Select Something', options, disabled: false, required: true, component: FormSelect, validate: validateSelect },
    { name: 'someCheckbox', label: 'Required Checkbox', type: 'checkbox', checked: true, disabled: false, required: true, component: FormCheckbox, validate: validateCheckbox }
];

const additionalFieldDefinitions = [
    { name: 'optionalField', label: 'Optional Field', type: 'text', disabled: false, required: false, component: FormInput },
    { name: 'disabledField', label: 'Disabled Field', type: 'text', disabled: true, required: false, component: FormInput },
    { name: 'otherRequiredField', label: 'Other Required Field', type: 'text', disabled: false, required: true, component: FormInput, validate: validateText }
];

const allFieldDefinitions = [ ...generalFieldDefinitions, ...additionalFieldDefinitions ];

const renderField = (fieldDefinition) => <Field key={fieldDefinition.name} {...fieldDefinition} />;

const renderGeneralFormFields = () => (
    <div>{generalFieldDefinitions.map((fieldDefinition) => renderField(fieldDefinition))}</div>
);

const renderAdditionalFormFields = () => (
    <div>{additionalFieldDefinitions.map((fieldDefinition) => renderField(fieldDefinition))}</div>
);

class MyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showAdditionalFields: false };
    }

    componentDidMount() {
        this.props.fetchDemoData();
    }

    saveFormData(data) {
        return this.props.storeDemoData(data);
    }

    toggleAdditionalFields() {
        this.setState({ showAdditionalFields: !this.state.showAdditionalFields });
    }

    render() {
        const {
            isFetching : isFetchingDemoData,
            handleSubmit,
            pristine,
            reset,
            submitting,
            submitSucceeded
        } = this.props;

        const { showAdditionalFields } = this.state;

        if (isFetchingDemoData) {
            return <Loader />
        }

        return (
            <Form horizontal onSubmit={handleSubmit(this.saveFormData.bind(this))}>
                <FieldArray
                    name='generalFields'
                    component={renderGeneralFormFields} />
                <Checkbox
                    checked={showAdditionalFields}
                    onChange={() => this.toggleAdditionalFields()}>
                    Show Additional Fields
                </Checkbox>
                {showAdditionalFields ?
                    <FieldArray
                        name='additionalFields'
                        component={renderAdditionalFormFields} /> :
                    null
                }
                <Button className='pull-left' bsStyle='primary' type='submit' disabled={submitting}>
                    {submitting ? <span><FontAwesome name='spinner' spin />&nbsp;</span> : null}
                    {submitSucceeded ? <span><FontAwesome name='check' />&nbsp;</span> : null}
                    Store data
                </Button>
                <Button className='pull-right' bsStyle='warning' disabled={pristine || submitting} onClick={reset}>
                    Reset data
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    initialValues: Object.assign(
        {},
        getDemoData(state),
        { selectSomething: 'option1' },
        { someCheckbox: true }
    ),
    isFetching: isFetching(state)
});

const mapDispatchToProps = {
    fetchDemoData,
    storeDemoData
}

MyForm = reduxForm({
    form: 'myForm',
    validate: validate.bind(null, allFieldDefinitions),
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false
})(MyForm);

MyForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

export default MyForm;
