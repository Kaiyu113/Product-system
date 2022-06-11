import { useState } from "react";
import validator from "validator";
import { Button } from "antd";

import { SIGNIN_FORM } from "../../content/loginform";
import Input from "../../Common/TextInput/Textinput";

const Signin = ({
  handleOnClicksignup = () => {},
  handleOnClickforgetpassword = () => {},
}) => {
  const [showpassword, setshowpassword] = useState(false);

  const [inputvalue, setinputvalue] = useState({
    Email: "",
    Password: "",
    EmailError: "",
    PasswordError: "",
    Show: false,
  });

  const handleonchange = (e) => {
    setinputvalue({ ...inputvalue, [e.target.name]: e.target.value });
  };

  const VlidateEmail = () => {
    let EmailError = "";
    if (!validator.isEmail(inputvalue.Email)) {
      EmailError = SIGNIN_FORM.EMAIL.ERROR_MESSAGE;
    }
    setinputvalue({
      ...inputvalue,
      EmailError,
    });
    return EmailError;
  };

  const VlidatePassword = () => {
    let PasswordError = "";
    if (inputvalue.Password.length < 6) {
      PasswordError = SIGNIN_FORM.PASSWORD.ERROR_MESSAGE;
    }
    setinputvalue({
      ...inputvalue,
      PasswordError,
    });
    return PasswordError;
  };

  //---------------------------------------------------------------
  const handlesubmitlogin = async () => {
    const passworderror = VlidatePassword();
    const emailerror = VlidateEmail();
    if (!(emailerror || passworderror)) {
      const response = await fetch("http://localhost:1337/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputvalue.Email,
          password: inputvalue.Password,
        }),
      });
      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login successful");
        window.location.href = "/home";
      } else {
        alert("Please check your username and password");
      }
    }
  };

  //--------------------------------------------------------------------

  const changetext = () => {
    if (!showpassword) {
      setshowpassword(true);
    } else {
      setshowpassword(false);
    }
  };

  return (
    <div className="form-container">
      {/* <pre>{JSON.stringify(inputvalue, undefined, 2)}</pre> */}
      <h1>{SIGNIN_FORM.SIGNINS}</h1>
      <Input
        type={SIGNIN_FORM.EMAIL.TYPE}
        inputname={SIGNIN_FORM.EMAIL.LABEL}
        label={SIGNIN_FORM.EMAIL.LABEL}
        placeholder={SIGNIN_FORM.EMAIL.PLACE_HOLDER}
        value={inputvalue.Email}
        onChange={handleonchange}
        errorMessage={inputvalue.EmailError}
      />

      <Input
        type={showpassword ? "text" : "password"}
        inputname={SIGNIN_FORM.PASSWORD.LABEL}
        label={SIGNIN_FORM.PASSWORD.LABEL}
        placeholder={SIGNIN_FORM.PASSWORD.LABEL}
        value={inputvalue.Password}
        onChange={handleonchange}
        errorMessage={inputvalue.PasswordError}
      />

      <a onClick={changetext}>{showpassword ? "Unshow" : "Show"}</a>

      <Button onClick={handlesubmitlogin}>{SIGNIN_FORM.SUBMIT_BUTTON}</Button>
      <div>
        Don't have an account?<a onClick={handleOnClicksignup}>sign up</a>
      </div>
      <div>
        <a onClick={handleOnClickforgetpassword}>Forget Password?</a>
      </div>
    </div>
  );
};

export default Signin;
