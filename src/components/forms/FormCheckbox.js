import React from 'react';
import { FormGroup, HelpBlock, Col, ControlLabel, Checkbox } from 'react-bootstrap';

class FormCheckbox extends React.Component {
    render() {
        const { input, label, disabled, meta: { active, touched, error } } = this.props;

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
                    <Checkbox
                        checked={input.value}
                        disabled={disabled}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        onChange={input.onChange}>
                        {label}
                    </Checkbox>
                    {validationHint}
                </Col>
            </FormGroup>
        );
    }
}

FormCheckbox.propTypes = {
    label: React.PropTypes.string.isRequired,
    input: React.PropTypes.shape({
        onFocus: React.PropTypes.func.isRequired,
        value: React.PropTypes.bool.isRequired,
        name: React.PropTypes.string.isRequired
    }).isRequired,
    meta: React.PropTypes.shape({
        active: React.PropTypes.bool.isRequired,
        touched: React.PropTypes.bool.isRequired,
        error: React.PropTypes.string
    }).isRequired,
    disabled: React.PropTypes.bool
}

export default FormCheckbox;
