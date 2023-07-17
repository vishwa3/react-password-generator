import PropTypes from "prop-types";

function Button({ customClassName, onClick, label }) {
  return (
    <button className={customClassName} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;

Button.propTypes = {
  customClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
