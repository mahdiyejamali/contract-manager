import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'gumdrops/FormGroup';
import FormGroupLabel from 'gumdrops/FormGroupLabel';
import TextInput from 'gumdrops/TextInput';
import Button from 'gumdrops/Button';

const DateFormGroup = ({ value, onClick, title, size }) => (
    <FormGroup>
        <FormGroupLabel text={title} />
        <div className="gds-form-group__input-group">
            <TextInput
                className="gds-form-group__text-input--right-edge"
                value={value}
                placeholder={title}
                readOnly
                size={size}
            />
            <Button
                context="primary"
                className="gds-button--button-cap"
                onClick={onClick}
                size={size}
            >
                <i className="fa fa-calendar" />
            </Button>
        </div>
    </FormGroup>
);

DateFormGroup.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.string
};

export default DateFormGroup;
