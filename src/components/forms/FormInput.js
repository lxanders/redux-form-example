import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';

class FormInput extends React.Component {
    render() {
        const { input, label, type, disabled, meta: { active, touched, error } } = this.props;
        const validationState = !active && touched && error ? 'error' : undefined;
        const validationHint = validationState === 'error' ? <HelpBlock>{error}</HelpBlock> : null;

        return (
            <FormGroup
                controlId={input.name}
                key={input.name}
                validationState={validationState}>
                <Col componentClass={ControlLabel} sm={2}>
                    {label}
                </Col>
                <Col sm={10}>
                    <FormControl
                        type={type}
                        value={input.value}
                        placeholder={label}
                        disabled={disabled}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        onChange={input.onChange}
                        required />
                    {validationHint}
                </Col>
            </FormGroup>
        );
    }
}

FormInput.propTypes = {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    input: React.PropTypes.shape({
        onFocus: React.PropTypes.func.isRequired,
        value: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }).isRequired,
    meta: React.PropTypes.shape({
        active: React.PropTypes.bool.isRequired,
        touched: React.PropTypes.bool.isRequired,
        error: React.PropTypes.string
    }).isRequired
};

export default FormInput;
