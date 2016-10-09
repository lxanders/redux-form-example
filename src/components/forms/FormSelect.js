import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';

// <FormControl
//     type={type}
//     value={input.value}
//     placeholder={label}
//     disabled={disabled}
//     onBlur={input.onBlur}
//     onFocus={input.onFocus}
//     onChange={input.onChange} />

class FormSelect extends React.Component {
    renderOptions() {
        const { options } = this.props;

        return options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>);
    }

    render() {
        const { input, label, selected, disabled, meta: { active, touched, error } } = this.props;
        const validationState = !active && touched && error ? 'error' : undefined;
        const validationHint = validationState === 'error' ? <HelpBlock>{error}</HelpBlock> : null;

        return (
            <FormGroup controlId={input.name} key={input.name} validationState={validationState}>
                <Col componentClass={ControlLabel} sm={2}>
                    {label}
                </Col>
                <Col sm={10}>
                    <FormControl
                        componentClass='select'
                        placeholder={label}
                        defaultValue={input.value}
                        disabled={disabled}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        onChange={input.onChange}>
                        {this.renderOptions()}
                    </FormControl>
                    {validationHint}
                </Col>
            </FormGroup>
        );
    }
}

FormSelect.propTypes = {
    label: React.PropTypes.string.isRequired,
    input: React.PropTypes.shape({
        onFocus: React.PropTypes.func.isRequired,
        value: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }).isRequired,
    meta: React.PropTypes.shape({
        active: React.PropTypes.bool.isRequired,
        touched: React.PropTypes.bool.isRequired,
        error: React.PropTypes.string
    }).isRequired,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
        value: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired
    })).isRequired,
    disabled: React.PropTypes.bool,
    selected: React.PropTypes.string
};

export default FormSelect;
