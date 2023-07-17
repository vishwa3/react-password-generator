import PropTypes from "prop-types";

function PasswordStrengthIndicator({ password }) {
  function getPasswordStrength() {
    const passwordLength = password.length;
    if (passwordLength < 8) {
      return "Poor";
    } else if (passwordLength < 12) {
      return "Medium";
    } else if (passwordLength < 16) {
      return "Strong";
    } else {
      return "Very Strong";
    }
  }

  const passwordStrength = getPasswordStrength();

  return (
    <div className="password_strength">
      <p>Strength:</p>
      <p>{passwordStrength}</p>
    </div>
  );
}

export default PasswordStrengthIndicator;

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string.isRequired,
};
