import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {NotFound, Home, Login, Profile} from "./pages"

const Signup = () => <h1>Signup</h1>
//const Login = () => <h1>Login</h1>



const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
