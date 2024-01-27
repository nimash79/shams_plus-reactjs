import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";
import { twoDigit } from "../../utils/helper";

const CustomDatePicker = ({
  title,
  icon,
  iconDisabled,
  onClick,
  value,
  onChange,
  input,
  ...props
}) => {
  const renderCustomInput = ({ ref }) => {
    <input
      readOnly
      ref={ref}
      title={title}
      value={value ? value.day : ""}
      {...props}
    />;
  };
  return (
    <div className="input-form">
      <label>{title}</label>
      <DatePicker
        value={value}
        onChange={onChange}
        renderInput={renderCustomInput}
        calendarClassName="calendar"
        wrapperClassName="calendar-wrapper"
        calendarPopperPosition="bottom"
        locale="fa"
        shouldHighlightWeekends
      />
      <i className={`fas fa-${icon}`}></i>
    </div>
  );
};

export default CustomDatePicker;
