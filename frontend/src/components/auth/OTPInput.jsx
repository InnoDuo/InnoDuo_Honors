import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../App";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../context/theme";
// url to connect to the backend
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

export default function () {
  const navigate = useNavigate();
  const { rEmail, otp, setPage } = useContext(RecoveryContext);
  const { defaultTheme } = useContext(ThemeContext);

  const [timerCount, setTimer] = React.useState(30);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:3000/send_recovery_email", {
        OTP: otp,
        recipient_email: rEmail,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      alert("OTP has been verified");
      navigate("/reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div
      className={`signin-page ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <div className="signin-container">
        <div className="signin-content">
          <h2 className="form-title">Email Verification</h2>

          <div className="">
            <p>We have sent a code to your email. {rEmail}</p>
          </div>

          <form 
            className="auth-form">
            <div className="form-fields" id="opt-input-fields">
              <div className="opt-fields">
                <input
                  maxLength="1"
                  type="number"
                  autocomplete="off"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      e.target.value,
                      OTPinput[1],
                      OTPinput[2],
                      OTPinput[3],
                    ])
                  }
                ></input>
              </div>
              <div className="opt-fields">
                <input
                  maxLength="1"
                  type="number"
                  autocomplete="off"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      OTPinput[0],
                      e.target.value,
                      OTPinput[2],
                      OTPinput[3],
                    ])
                  }
                ></input>
              </div>
              <div className="opt-fields">
                <input
                  maxLength="1"
                  type="number"
                  autocomplete="off"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      OTPinput[0],
                      OTPinput[1],
                      e.target.value,
                      OTPinput[3],
                    ])
                  }
                ></input>
              </div>
              <div className="opt-fields">
                <input
                  maxLength="1"
                  type="number"
                  autocomplete="off"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      OTPinput[0],
                      OTPinput[1],
                      OTPinput[2],
                      e.target.value,
                    ])
                  }
                ></input>
              </div>
            </div>

            <div className="auth-btn-holder">
              <div onClick={() => verfiyOTP()} className="primary-btn">
                <button type="submit">Verify Account</button>
              </div>
            </div>
          </form>

          <div className="other-options">
            <div>Didn't recieve code? &nbsp; </div> <br />
            <div>
              <a
                style={{
                  color: disable ? "gray" : "blue",
                  cursor: disable ? "none" : "pointer",
                  textDecorationLine: disable ? "none" : "underline",
                }}
                onClick={() => resendOTP()}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
