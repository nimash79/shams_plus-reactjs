const CustomButton = ({title, style, onClick}) => {
    return <button className="button" type="button" style={style} onClick={onClick}>{title}</button>
}

export default CustomButton;