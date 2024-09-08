import React from "react";
import { useContext, useState } from "react";
import { RecoveryContext } from "../../App";
import { ThemeContext } from "../../context/theme";
// import { useAuth } from "../../context/authContext";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { MdPassword } from "react-icons/md";
import useInput from "../microcomponents/customhooks/useInput";
import { ToastContainer, toast } from "react-toastify";

// url to connect to the backend
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

export default function Reset() {
  const { defaultTheme } = useContext(ThemeContext);
  // const { login, logout } = useAuth();
  const { rEmail, setPage } = useContext(RecoveryContext);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [resetPassword, bindResetPassword, resetResetPassword] = useInput("");
  const [
    confirmResetPassword,
    bindConfirmResetPassword,
    resetConfirmResetPassword,
  ] = useInput("");

  function changePassword() {
    setPage("recovered");
  }

  const showPassHandler = () => {
    let userPass = document.getElementById("user-reset-password");
    if (!showPass) {
      userPass.type = "text";
      setShowPass(!showPass);
    } else {
      userPass.type = "password";
      setShowPass(!showPass);
    }
  };
  const showConfirmPassHandler = () => {
    let userConfirmPass = document.getElementById(
      "user-confirm-reset-password"
    );
    if (!showConfirmPass) {
      userConfirmPass.type = "text";
      setShowConfirmPass(!showConfirmPass);
    } else {
      userConfirmPass.type = "password";
      setShowConfirmPass(!showConfirmPass);
    }
  };

  const ResetPasswordHandler = async (e) => {
    e.preventDefault();
    e.persist();
    if (resetPassword === confirmResetPassword) {
      toast.success("Password does match");
      try {
        const response = await fetch(baseUrl + "/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: rEmail + "@caldwell.edu",
            resetPassword,
          }),
        });
        const data = await response.json();
        if (data.message === "Password reset successfully") {
          // navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("An error occurred during resetting.");
      }
    }else{
      toast.error("Password does not match");
    }
  };

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
            onSubmit={ResetPasswordHandler}
          >
            <div className="form-fields">
              <div className="user-reset-password-info input-field">
                <label htmlFor="user-reset-password">New Password</label>
                <div className="field-restrict">
                  <div className="input-field-wrap">
                    <input
                      type="password"
                      name="user-reset-password"
                      id="user-reset-password"
                      placeholder="***********"
                      {...bindResetPassword}
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
              <div className="user-confirm-reset-password-info input-field">
                <label htmlFor="user-confirm-reset-password">
                  Confirm New Password
                </label>
                <div className="field-restrict">
                  <div className="input-field-wrap">
                    <input
                      type="password"
                      name="user-confirm-reset-password"
                      id="user-confirm-reset-password"
                      placeholder="***********"
                      {...bindConfirmResetPassword}
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
                <button
                  onClick={() => changePassword()}
                  className="auth-button"
                >
                  Reset passwod
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
