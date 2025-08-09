import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  let LoginUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/wudzique/user/login", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("You have logged in successfully");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        setFormData({
          email: "",
          password: "",
          role: "",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error("Invalid credentials");
        } else if (error.response?.status === 500) {
          toast.error("Server error");
        } else {
          toast.error("Login failed");
        }
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  return (
    <>
      <div className="login-container">
        <ToastContainer />
        <div className="login-form">
          <form className="space-y-4" onSubmit={LoginUser}>
            <h1>Login</h1>
            <label htmlFor="email" value=""></label>
            <input
              type="email"
              value={formData.email}
              name="email"
              placeholder="Email ID"
              onChange={getValue}
              className="focus:outline-none custom-input"
              required
            />
            <label htmlFor="password" value=""></label>
            <input
              type="password"
              value={formData.password}
              name="password"
              placeholder="Password"
              onChange={getValue}
              className="focus:outline-none custom-input"
              required
            />
            <div className="role-radio">
              <label className=" cursor-pointer" htmlFor="role">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={getValue}
                />
                Admin
              </label>
              <label className="cursor-pointer" htmlFor="role">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={getValue}
                />
                Customer
              </label>
            </div>
            <button type="submit">Login</button>
            <span>
              <a href="/register">Create an account? </a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export function Register() {
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  let saveUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/wudzique/user/register", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("You have registered successfully");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          toast.error("User already exists");
        } else {
          toast.error("Registration failed");
        }
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  return (
    <>
      <div className="login-container">
        <ToastContainer />
        <div className="login-form">
          <form className="space-y-4" onSubmit={saveUser}>
            <h1>Sign In</h1>

            <label htmlFor="username" value=""></label>
            <input
              type="text"
              value={formData.username}
              name="username"
              placeholder="Username"
              onChange={getValue}
              className="focus:outline-none custom-input"
              required
            />

            <label htmlFor="email" value=""></label>
            <input
              type="email"
              value={formData.email}
              name="email"
              placeholder="Email ID"
              onChange={getValue}
              className="focus:outline-none custom-input"
              required
            />
            <label htmlFor="password" value=""></label>
            <input
              type="password"
              value={formData.password}
              name="password"
              placeholder="Password"
              onChange={getValue}
              className="focus:outline-none custom-input"
              required
            />
            <div className="role-radio">
              <label className=" cursor-pointer" htmlFor="role">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={getValue}
                />
                Admin
              </label>
              <label className="cursor-pointer" htmlFor="role">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={getValue}
                />
                Customer
              </label>
            </div>

            <button type="submit">Sign up</button>
            <span>
              <a href="/login">Already have an account? </a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
