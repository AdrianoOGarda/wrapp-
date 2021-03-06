import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LayoutApp from "./components/LayoutApp"
import {NotFound, Home, Login, Profile, Signup, NewProject, Chats, Chat, Project, Post, PopUsers, Landing} from "./pages"
import Popular from './pages/Popular';

//const Signup = () => <h1>Signup</h1>
//const Login = () => <h1>Login</h1>
//const Detalle = () => <h1>Vista de detalle del proyecto</h1>

const Router = () => {
  return (
  <BrowserRouter>
  <LayoutApp>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/users/:userId" component={Profile}/>
      <Route exact path="/projects" component={NewProject}/>
      <Route exact path="/jobPosts" component={Post}/>
      <Route exact path="/popular" component={Popular}/>
      <Route exact path="/chats" component={Chats}/>
      <Route exact path="/chats/:chatId" component={Chat}/>
      <Route exact path="/popUsers" component={PopUsers}/>
      <Route exact path="/projects/:projectId" component={Project}/>
      <Route component={NotFound} />
    </Switch>
  </LayoutApp>
  </BrowserRouter>
  )
};

export default Router;
