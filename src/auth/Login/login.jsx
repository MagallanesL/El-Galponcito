// Login.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import InputField from './InputField';  
import ErrorMessage from './ErrorMessage'; 
import AuthButton from './AuthButton'; 
import ToggleButton from './ToggleButton'; 
import './'

const auth = getAuth();

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'nombre') setNombre(value);
    else if (name === 'telefono') setTelefono(value);
    else if (name === 'direccion') setDireccion(value);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      setError(null);
      if (userEmail === 'elgalponcito@elgalponcito.com') {
        navigate('/admin');
      } else {
        navigate('/clients');
      }
    } catch (err) {
      setError('Error al iniciar sesión, verifique sus credenciales.');
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "Usuarios", user.uid), {
        email: user.email,
        nombre,
        telefono,
        direccion,
        createdAt: new Date(),
      });
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrarse, intente nuevamente.');
    }
  };


    return (
      <div className="login-container">
        <div className="login-form">
          <h1>{isRegister ? 'Registro' : 'Iniciar Sesión'}</h1>
          <ErrorMessage error={error} className="error-message" />
          
          {isRegister && (
            <>
              <InputField
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                placeholder="Nombre o Apodo"
                className="input-field"
              />
              <InputField
                name="telefono"
                value={telefono}
                onChange={handleInputChange}
                placeholder="Número de Teléfono"
                className="input-field"
              />
              <InputField
                name="direccion"
                value={direccion}
                onChange={handleInputChange}
                placeholder="Dirección"
                className="input-field"
              />
            </>
          )}
          
          <InputField
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            type="email"
            className="input-field"
          />
          
          <InputField
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Password"
            type="password"
            className="input-field"
          />
          
          <AuthButton
            onClick={isRegister ? handleRegister : handleLogin}
            text={isRegister ? 'Registrarse' : 'Iniciar Sesión'}
            className="auth-button"
          />
          
          <ToggleButton
            onClick={() => setIsRegister(!isRegister)}
            text={isRegister ? '¿Ya tienes cuenta? ¡Inicia sesión!' : '¿No tienes cuenta? Regístrate gratis!'}
            className="toggle-button"
          />
        </div>
      </div>
    );
    
};

export default Login;
