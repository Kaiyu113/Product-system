import { useState } from "react";
import validator from "validator";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { SIGNIN_FORM } from "../../content/loginform";
import Input from "../../Common/TextInput/Textinput";

const Signup = ({ handleOnClicksignin = () => {} }) => {
  const history = useHistory();

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

  const changetext = () => {
    if (!showpassword) {
      setshowpassword(true);
    } else {
      setshowpassword(false);
    }
  };

  //back end----------------------------------------------------------------
  const handlesubmituser = async () => {
    const emailerror = VlidateEmail();
    const passworderror = VlidatePassword();

    if (!(emailerror || passworderror)) {
      const response = await fetch("http://localhost:1337/api/signup", {
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
      if (data.status === "ok") {
        alert("user Sign Up successfully");
      }
    }
  };

  //--------------------------------------------------------------------
  return (
    <div className="form-container">
      {/* <pre>{JSON.stringify(inputvalue, undefined, 2)}</pre> */}
      <h1>{SIGNIN_FORM.SIGNUP}</h1>
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

      <Button onClick={handlesubmituser}>{SIGNIN_FORM.SUBMIT_SIGNUP}</Button>
      <div>
        Already have an account <a onClick={handleOnClicksignin}>sign in </a>
      </div>
    </div>
  );
};

export default Signup;
