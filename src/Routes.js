import React from "react";
import {Route, Switch} from "react-router-dom";
import WeatherUI from "./components/WeatherUI";
import Login from "./components/Login/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";
import ResetPassword from "./components/ResetPassword/ResetPassword";

export default function Routes() {
    return (
        <Switch>
            <AuthenticatedRoute path="/app">
                <div className="App">
                    <WeatherUI/>
                </div>
            </AuthenticatedRoute>
            <UnauthenticatedRoute exact path="/login">
                <Login/>
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/app">
                <Login/>
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/">
                <Login/>
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/login/reset">
                <ResetPassword/>
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/">
                <div className="App">
                    <WeatherUI/>
                </div>
            </AuthenticatedRoute>
            <Route exact path="/login"><Login/></Route>
        </Switch>
    );
}
