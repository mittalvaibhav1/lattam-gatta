import "./InputBox.css";

const InputBox = ({
  Icon,
  name = "",
  placeholder = "",
  value = "",
  setValue = null
}) => {
  return (
    <div className="inputbox">
      <Icon className="inputbox__icon" />
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
