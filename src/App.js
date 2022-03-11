// import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import Home from "./pages/home/Home";
import Header from "./components/Header";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import Account from "./pages/account/Account";

import { AuthContextProvider } from "./contexts/AuthContext";
import Restaurant from "./pages/restaurant/Restaurant";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header />
        <div className="container">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.RESTAURANT} element={<Restaurant />} />
            <Route path={ROUTES.ACCOUNT} element={<Account />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
