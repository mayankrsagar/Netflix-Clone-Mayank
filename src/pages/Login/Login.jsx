import './Login.css';

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import PendingIcon from '@mui/icons-material/Pending';

import logo from '../../assets/logo.png';
import {
  login,
  signUp,
} from '../../firebase';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [signState, setSignState] = useState("Sign In");
  const [remember, setRemember] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };

  const { name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password, enqueueSnackbar);
        if (remember) {
          localStorage.setItem('userEmail', email);
        }
      } else {
        await signUp(name, email, password, enqueueSnackbar);
      }
    } catch (err) {
      // enqueueSnackbar(err.message, { variant: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="Logo" className="loginLogo" />
      <div className="loginForm">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <PendingIcon /> : signState}
          </button>
          <div className="formHelp">
            <div className="remember">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={remember}
                onChange={handleRememberChange}
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="formSwitch">
          {signState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In</span>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
