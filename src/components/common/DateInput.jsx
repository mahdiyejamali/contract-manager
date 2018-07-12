import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import DateFormGroup from './DateFormGroup.jsx';

const DateInput = ({ selected, onChange, title, minDate, maxDate, size, isClearable }) => (
    <DatePicker
        title={title}
        customInput={<DateFormGroup size={size} />}
        customInputRef="inputRef"
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        isClearable={isClearable}
    />
);

DateInput.defaultProps = {
    size: "md",
    isClearable: true
};

DateInput.propTypes = {
    onChange: PropTypes.func,
    selected: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    title: PropTypes.string,
    size: PropTypes.string,
    isClearable: PropTypes.bool
};

export default DateInput;
