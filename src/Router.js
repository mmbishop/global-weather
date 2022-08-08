import React from "react";
import {Route} from 'react-router-dom';
import {Routes} from 'react-router';
import WeatherUI from "./components/WeatherUI";
import Login from "./components/Login/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";
import ResetPassword from "./components/ResetPassword/ResetPassword";

export default function Router() {
    return (
        <Routes>
            <Route path="/app" element={
              <AuthenticatedRoute>
                <div className="App">
                  <WeatherUI/>
                </div>
              </AuthenticatedRoute>
            } />
            <Route path="/login" element={
              <UnauthenticatedRoute>
                <Login/>
              </UnauthenticatedRoute>
            } />
            <Route path="/login/reset" element={
              <UnauthenticatedRoute>
                <ResetPassword/>
              </UnauthenticatedRoute>
            } />
            <Route path="/" element={
              <AuthenticatedRoute>
                <div className="App">
                  <WeatherUI/>
                </div>
              </AuthenticatedRoute>
            } />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
