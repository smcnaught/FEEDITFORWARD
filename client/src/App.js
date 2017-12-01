import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Donations from "./pages/Donations";
import Donate from "./pages/Donate";

import "./index.css";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/donations" component={Donations}/>
        <Route exact path="/donate" component={Donate}/>
      </Wrapper>
      <Footer/>
    </div>
  </Router>;

export default App;
