import "./Button.css";

const Button = ({ onClick = null, background, children }) => {
  return (
    <button
      onClick={onClick}
      style={background ? { backgroundColor: background } : {}}
      className="button"
    >
      {children}
    </button>
  );
};

export default Button;
