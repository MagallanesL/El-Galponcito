import './login.css'
const AuthButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthButton;
