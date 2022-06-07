import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import useToken from './useToken';
import RunOverview from '../RunOverview/RunOverview';
import CreateProject from '../CreateProject/CreateProject';
import ViewProjects from '../ViewProjects/ViewProjects';
import NewRun from '../NewRun/NewRun';
import { UserContext } from '../../contexts/UserContext';
import ViewRuns from '../ViewRuns/ViewRuns';
import CompareRuns from '../CompareRuns/CompareRuns';
import FindingsContextProvider from '../../contexts/FindingsContext';

function App() {
  // Token saved when the user is logged in
  // const { token, setToken, clearToken } = useToken();
  const { userId, saveUserId, clearUserId } = React.useContext(UserContext);

  const getComponentDefault = () => {
    if (userId === undefined) {
      return <Login setToken={saveUserId} />;
    } else {
      return <ViewRuns />;
    }
  };

  const getComponentSignUp = () => {
    if (userId === undefined) {
      return <SignUp setToken={saveUserId} />
    } else {
      return <ViewRuns />;
    }
  }

  const getComponentLogin = () => {
    if (userId === undefined) {
      return <Login setToken={saveUserId} />
    } else {
      return <ViewRuns />;
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top sidebar">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>Python Code Analysis</Link>
            <div className="collapse navbar-collapse" id="navbarToggle">
              <ul className="navbar-nav ml-auto">
                <li className={userId === undefined ? "nav-item show" : "nav-item hide"}>
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className={userId === undefined ? "nav-item show" : "nav-item hide"}>
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                <li className={userId !== undefined ? "nav-item show" : "nav-item hide"}>
                  <Link className="nav-link" to={"/login"} onClick={clearUserId}>Log out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <FindingsContextProvider>
          <Switch>
            <Route exact path="/">
              {getComponentDefault()}
            </Route>
            <Route path="/dashboard">
              {getComponentDefault()}
            </Route>
            <Route path="/login">
              {getComponentLogin()}
            </Route>
            <Route path="/sign-up">
              {getComponentSignUp()}
            </Route>
            <Route exact path="/run-overview/:id" component={RunOverview} />
            <Route exact path="/compare-runs" component={CompareRuns} />
            <Route exact path="/create-project">
              <CreateProject />
            </Route>
            <Route exact path="/view-projects">
              <ViewProjects />
            </Route>
            <Route exact path="/new-run">
              <NewRun />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
        </FindingsContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
