// import from react
import React, { useState, useEffect, useContext, createContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

// import from assets
import "../../assets/css/signin.css";
import axios from "axios";

// import from components
import useInput from "../microcomponents/customhooks/useInput";

// import from context
import { ThemeContext } from "../../context/theme";
import useAuth, { authContext } from "../../context/authContext";
import { recoveryContext } from "../../context/recoveryContext";
import { RecoveryContext } from "../../App";

// url to connect to the backend
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

const SignIn = () => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");

  const { defaultTheme } = useContext(ThemeContext);
  const { login, logout } = useAuth();

  const { setREmail, setPage, page, rEmail, setOTP } =
    useContext(RecoveryContext);

  const showPassHandler = () => {
    let userPass = document.getElementById("user-password");
    if (!showPass) {
      userPass.type = "text";
      setShowPass(!showPass);
    } else {
      userPass.type = "password";
      setShowPass(!showPass);
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    resetEmail();
    resetPassword();

    try {
      const response = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email + "@caldwell.edu", password }),
      });
      const data = await response.json();
      if (data.message === "Logged in successfully") {
        login(data.user);
        navigate("/");
      } else {
        logout();
        toast.error(data.message);
      }
    } catch (error) {
      logout();
      toast.error("An error occurred during sign in.");
    }
  };

  const nagigateToOtp = () => {
    if (!email) {
      return alert("Please enter your email");
    }
    console.log(rEmail);
    setREmail(email);
    console.log(rEmail);
    try {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post(baseUrl + "/send_recovery_email", {
          OTP,
          recipient_email: email + "@caldwell.edu",
        })
        .then(() => {
          // setPage("otp")
          navigate("/otp");
        })
        .catch(console.log);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  // if (page === "otp") return <OTPInput />;
  // if (page === "reset") return <Reset />;
  // if (page === "recovered") return <Recovered />;

  return (
    <div
      className={`signin-page ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <div className="signin-container">
        <div className="signin-content">
          <h2 className="form-title">Sign In</h2>

          <form
            action=""
            method="post"
            className="auth-form"
            onSubmit={signInHandler}
          >
            <div className="form-fields">
              <div className="user-email-info input-field">
                <label htmlFor="user-email">Email</label>
                <div className="field-restrict">
                  <div id="email-input-field" className="input-field-wrap">
                    <input
                      type="text"
                      name="user-email"
                      id="user-email"
                      placeholder="johndoe"
                      {...bindEmail}
                      required
                    />
                  </div>
                  <span> @ caldwell.edu</span>
                </div>
              </div>

              <div className="user-password-info input-field">
                <label htmlFor="user-password">Password</label>
                <div className="field-restrict">
                  <div className="input-field-wrap">
                    <input
                      type="password"
                      name="user-password"
                      id="user-password"
                      placeholder="***********"
                      {...bindPassword}
                      required
                    />
                    <div className="display-password" onClick={showPassHandler}>
                      <PiEyeBold
                        id="open-eye"
                        className={`pass-icon ${
                          showPass ? "pass-display" : ""
                        }`}
                      />
                      <PiEyeClosedBold
                        id="closed-eye"
                        className={`pass-icon ${
                          showPass ? "" : "pass-display"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="forgot-password"
                style={{
                  marginLeft: "185px",
                  color: "#8D2A2A",
                  marginBottom: "10px",
                }}
              >
                <a href="#" onClick={() => nagigateToOtp()}>
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="auth-btn-holder">
              <div className="primary-btn">
                <button type="submit">Sign In</button>
              </div>
            </div>
          </form>
        </div>
        <div className="other-options">
          <div className="register-link">Do not have an account? </div>
          <span>
            <NavLink to="/signup">
              <b>Signup</b>
            </NavLink>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
