const CustomCheckbox = ({ id, title, onChange }) => {
  return (
    <div className="checkbox-input">
      <input type="checkbox" id={id} onChange={onChange} />
      <label for={id}>
        <span className="checkbox"></span> {title}
      </label>
    </div>
  );
};

export default CustomCheckbox;
