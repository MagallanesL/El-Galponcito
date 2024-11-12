// InputField.js
import'./inputField.css'


const InputField = ({ name, value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputField;