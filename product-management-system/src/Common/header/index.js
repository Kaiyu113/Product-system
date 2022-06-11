import "./index.css";
import Button from "../../Component/SigninModal";

const Header = ({}) => {
  return (
    <div className="header">
      Management Chuwa
      <input placeholder="Search" />
      <Button>Sign In</Button>
      <button> Cart</button>
    </div>
  );
};

export default Header;
