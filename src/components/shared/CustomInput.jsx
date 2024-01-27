const CustomInput = ({title, icon, iconDisabled, onClick, onChange, ...props}) => {
    return (
        <div className="input-form">
          <label>{title}</label>
          <input title={title} onChange={onChange} {...props} />
          {onClick ? <i className={iconDisabled ? `fas fa-${icon} icon-click disable` : `fas fa-${icon} icon-click`} onClick={onClick}></i>
          : <i className={iconDisabled ? `fas fa-${icon} disable` : `fas fa-${icon}`} onClick={onClick}></i> }
        </div>
    )
}

export default CustomInput;