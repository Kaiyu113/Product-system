import Header from "./Common/header";
import Footer from "./Common/footer";
import home from "./Component/home";
import Signin from "./Component/Form/Signin";
import addproduct from "./Component/addproduct/addproduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Header />

        <Switch>
          <Route path="/home" exact component={home} />
          <Route path="/Signin" exact component={Signin} />
          <Route path="/addproduct" exact component={addproduct} />
        </Switch>

        <Footer />
      </>
    </Router>
  );
}

export default App;
