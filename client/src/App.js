import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Signup from "./pages/Signup";
import Donations from "./pages/Donations";
import Donate from "./pages/Donate";
import Logout from "./pages/Logout";

import "./index.css";

const App = () =>
  <Router>
    <div>
      <Wrapper>
        <Route exact path="/" component={Signup}/>
        <Route exact path="/donations" component={Donations}/>
        <Route exact path="/donate" component={Donate}/>
        <Route exact path="/logout" component={Logout}/>
      </Wrapper>
    </div>
  </Router>;

export default App;
