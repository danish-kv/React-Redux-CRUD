import React, { useState } from "react";
import "../styles/logincheck.css";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { login } from "../redux/actions/authActions";

const Form = ({ route, method }) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("clicked");

    if(method === 'userRegister' && password !== confirmPassword){
        alert('Passwords does not match')
        setLoading(false)
        return
    }

    const data = {
        email,
        password,
    }

    if (method === "userRegister"){
        data.username = username;
        data.phone = phone;
    }

    console.log("Form data", data);

    try {
      const res = await api.post(route, data);
      console.log("API response", res.data);
      if (method === "userLogin") {
        localStorage.clear()
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("admin", res.data?.is_superuser);
        
        dispatch(login(res.data))
        alert('success')
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        const errorMessage = error.response.data.email[0];
        alert(errorMessage); 
      } else {
        console.error('Error to login:', error.message);
        alert('Failed to login. Please try again.'); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* User Login */}
      {method === "userLogin" && (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Login</h2>
          <div>
            <label>Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
              className="input"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              required
              className="input"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
          <p>
            Create an account <Link to="/register">Register</Link>
          </p>
        </form>
      )}

      {/* User Register */}

      {method === "userRegister" && (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Register</h2>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
              placeholder="Username"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
              className="input"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              name="phone"
              required
              className="input"
              placeholder="Phone"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              required
              className="input"
              placeholder="Password"
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name="confirmPassword"
              required
              className="input"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      )}
      
    </div>
  );
};

export default Form;
