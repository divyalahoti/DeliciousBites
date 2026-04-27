import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext } from "react";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";
import { toast } from "react-toastify";


const Login = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Login");
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        currentState === "Login"
          ? backendUrl + "/api/user/login"
          : backendUrl + "/api/user/register";


      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setToken(response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setToken(response.data.token);
          // window.location.reload();
          navigate("/");
        }
      } else {
        toast.error(response.data.message)
        alert(response.data.message);
        console.log(response.data.message)
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">

        <h2>{currentState}</h2>
        <p className="subtitle">
          Welcome to <span>Delicious Bites</span>
        </p>

        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button type="submit">
          {currentState === "Login" ? "Login" : "Create Account"}
        </button>

        <div className="bottom-text">
          {currentState === "Login" ? (
            <>
              Don't have an account?
              <span onClick={() => setCurrentState("Sign Up")}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?
              <span onClick={() => setCurrentState("Login")}>
                Login
              </span>
            </>
          )}
        </div>

      </form>
    </div>
  );
};

export default Login;