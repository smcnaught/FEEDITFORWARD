import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Wrapper>
      <Route exact path="/" component={Landing}/>
      </Wrapper>
      <Footer/>
    </div>
  </Router>;

export default App;
