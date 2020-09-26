import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LayoutApp from "./components/LayoutApp"
import {NotFound, Home, Login, Profile, Signup, NewProject, Chats, Chat} from "./pages"
import Popular from './pages/Popular';

//const Signup = () => <h1>Signup</h1>
//const Login = () => <h1>Login</h1>

const Router = () => {
  return (
  <BrowserRouter>
  <LayoutApp>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/users/:userId" component={Profile}/>
      <Route exact path="/projects" component={NewProject}/>
      <Route exact path="/popular" component={Popular}/>
      <Route exact path="/chats" component={Chats}/>
      <Route exact path="/chats/:chatId" component={Chat}/>
      <Route component={NotFound} />
    </Switch>
  </LayoutApp>
  </BrowserRouter>
  )
};

export default Router;
