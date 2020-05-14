import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home";
import Login from "../Login/Login";
import SignUp from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Chat from "../Chats/Chats";
const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={SignUp}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/Chat/:friend" component={Chat}></Route>
      </Switch>
    </Router>
  );
};
export default Navigation;
