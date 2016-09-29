import React from 'react';

class FormInput extends React.Component {
    render() {
        const { input, label, type, meta: { active, touched, error } } = this.props;
        const errorMessage = !active && touched && error && <span>{error}</span>;

        console.log('was ist denn in input?', input);

        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} onFocus={input.onFocus} placeholder={label} type={type}/>
                    {errorMessage}
                </div>
            </div>
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
    })
};

export default FormInput;
