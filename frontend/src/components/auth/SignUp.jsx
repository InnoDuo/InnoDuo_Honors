import React, { useState, useContext } from "react";
import "../../assets/css/signin.css";
import useInput from "../microcomponents/customhooks/useInput";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth, { authContext } from "../../context/authContext";
import { ThemeContext } from "../../context/theme";

const SignUp = () => {
  const baseUrl = "http://localhost:3000"; // dev tests
  // const baseUrl = "https://innoduo-honors.onrender.com"; // prod

  const history = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [firstName, bindFirstName, resetFirstName] = useInput("");
  const [lastName, bindLastName, resetLastName] = useInput("");
  const [email, bindEmail, resetEmail] = useInput("");
  const [id, bindId, resetId] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const [confirmPassword, bindConfirmPassword, resetConfirmPassword] =
    useInput("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const { defaultTheme } = useContext(ThemeContext);
  const { login } = useAuth();

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
  const showConfirmPassHandler = () => {
    let userConfirmPass = document.getElementById("user-confirm-password");
    if (!showConfirmPass) {
      userConfirmPass.type = "text";
      setShowConfirmPass(!showConfirmPass);
    } else {
      userConfirmPass.type = "password";
      setShowConfirmPass(!showConfirmPass);
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    let idCheck = parseInt(id) > 100000 && parseInt(id) < 999999 ? true : false;
    let passCheck = password == confirmPassword ? true : false;
    let passValidate = strongRegex.test(password);
    let strongPassMsg = `- Use at least 8 characters. <br /> 
    - Use a mix of letters (uppercase and lowercase), numbers, and symbols.
    - Don't use your name, username, or account name. 
    - Avoid predictable passwords such as "password", "12345" or "caldwell".`;
    if (idCheck && passCheck && email && passValidate) {
      resetFirstName();
      resetLastName();
      resetEmail();
      resetEmail();
      resetId();
      resetPassword();
      resetConfirmPassword();
      fetch(baseUrl + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, id, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User registered successfully") {
            login(data.user);
            console.log("Logged in user: ", data.user);
            history("/Profile");
          } else {
            toast.error(data.error);
          }
        })
        .catch((error) => {
          toast.error(
            "An error: \n" + error + "\n has occurred. Please try again."
          );
        });
    } else if (!idCheck) {
      toast.error(
        "Student ID is a 6 digit number uniquely given to each students. Unable to validate email and id may lead in false data entry."
      );
    } else if (!passCheck) {
      toast.error(
        "The password doesn't match with confirm password. Try again!"
      );
    } else if (!passValidate) {
      toast.error(strongPassMsg);
    }
  };
  return (
    <div
      className={`signup-page ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <div className="signup-container">
        <div className="signup-content">
          <h2 className="form-title">Sign Up</h2>

          <form
            action=""
            method="post"
            className="auth-form"
            id="signup-form"
            onSubmit={signUpHandler}
          >
            <div className="form-fields">

              <div className="user-fname-info input-field">
                <label htmlFor="user-fname">First Name</label>
                <div className="field-restrict">
                  <div od="fname-input-field" className="input-field-wrap">
                    <input
                      type="number"
                      name="user-fname"
                      id="user-fname"
                      placeholder="John"
                      {...bindFirstName}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="user-lname-info input-field">
                <label htmlFor="user-lname">Last Name</label>
                <div className="field-restrict">
                  <div id="lname-input-field" className="input-field-wrap">
                    <input
                      type="number"
                      name="user-lname"
                      id="user-lname"
                      placeholder="Doe"
                      {...bindLastName}
                      required
                    />
                  </div>
                </div>
              </div>

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

              <div className="user-id-info input-field">
                <label htmlFor="user-id">Student ID</label>
                <div className="field-restrict">
                  <div id="id-input-field" className="input-field-wrap">
                    <input
                      type="number"
                      name="user-id"
                      id="user-id"
                      placeholder="123456"
                      {...bindId}
                      required
                    />
                  </div>
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

              <div className="user-confirm-password-info input-field">
                <label htmlFor="user-password">Confirm Password</label>
                <div className="field-restrict">
                  <div className="input-field-wrap">
                    <input
                      type="password"
                      name="user-password"
                      id="user-confirm-password"
                      placeholder="***********"
                      {...bindConfirmPassword}
                      required
                    />
                    <div
                      className="display-password"
                      onClick={showConfirmPassHandler}
                    >
                      <PiEyeBold
                        id="confirm-open-eye"
                        className={`pass-icon ${
                          showConfirmPass ? "confirm-pass-display" : ""
                        }`}
                      />
                      <PiEyeClosedBold
                        id="confirm-closed-eye"
                        className={`pass-icon ${
                          showConfirmPass ? "" : "confirm-pass-display"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-btn-holder">
              <div className="primary-btn">
                <button type="submit">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
        <div className="other-options">
          <div className="register-link">Already have an account? </div>
          <span>
            <NavLink to="/signin">
              <b>Login</b>
            </NavLink>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
