const CustomSelectbox = ({ title, options, icon, onClick, onChange }) => {
  return (
    <div className="input-form">
      <label>{title}</label>
      <select onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
      <i
        className={onClick ? `fas fa-${icon} icon-click` : `fas fa-${icon}`}
        onClick={onClick}
      ></i>
    </div>
  );
};

export default CustomSelectbox;
