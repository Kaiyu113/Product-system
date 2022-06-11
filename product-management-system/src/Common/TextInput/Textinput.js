import { Input } from "antd";

import "antd/dist/antd.css";
const Textinput = (props) => {
  const {
    type = "",
    inputname = "",
    label = "",
    value = "",
    placeholder = "",
    errorMessage = "",

    maxLength = 30,
    disabled = false,
    onChange = () => {},
  } = props;

  return (
    <div>
      {label ? <div>{label}</div> : null}
      <Input
        name={inputname}
        maxLength={maxLength}
        className={errorMessage ? "text-input-error" : "text-input"}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        errorMessage={errorMessage}
      />
      {/* {!errorMessage && infoMessage ? <div>{infoMessage}</div> : null} */}

      {errorMessage ? <div>{errorMessage}</div> : null}
    </div>
  );
};

export default Textinput;
