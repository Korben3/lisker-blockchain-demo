import React, { useState } from "react";
import "./App.css";
import GoogleFontLoader from "react-google-font-loader";
import Menu from "./components/Menu";
import Account from "./components/Account";
import Wallet from "./components/Wallet";
import Lisker from "./components/Lisker";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as cryptography from "@liskhq/lisk-cryptography";
import * as passphrase from "@liskhq/lisk-passphrase";
import * as transactions from "@liskhq/lisk-transactions";
import * as api from "./utils/api.js";

const App = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState([]);

  <GoogleFontLoader
    fonts={[
      {
        font: "Poppins",
        weights: [400, "400b"],
      },
    ]}
  />;

  const showMessage = (message) => {
    const alert = <div className="alertMessage">{message}</div>;
    setMessage(alert);
    setTimeout(hideMessage, 5000);
  };

  const hideMessage = () => {
    setMessage("");
  };

  const updateUserInfo = (liskerId, balance) => {
    // quick way to update userInfo
    let newUserInfo = userInfo;
    if (liskerId) {
      newUserInfo.liskerId = liskerId;
    } else if (balance > 0) {
      newUserInfo.balance -= balance;
    }
    console.log("updateUserInfo");
    setUserInfo(newUserInfo);
  };

  const login = async (userPassphrase) => {
    //verify if the passphrase is correct
    const errors = passphrase.validation.getPassphraseValidationErrors(
      userPassphrase
    );
    if (!errors.length) {
      let newUserInfo = [];
      newUserInfo.passphrase = userPassphrase;
      newUserInfo.address = cryptography.getBase32AddressFromPassphrase(
        userPassphrase
      );

      const account = await api.getAccount(newUserInfo.address);
      newUserInfo.liskerId = account.lisker.liskerId;
      newUserInfo.balance = transactions.convertBeddowsToLSK(
        account.token.balance.toString()
      );
      setUserInfo(newUserInfo);
      setLoggedIn(true);
      showMessage("Login successful.");
    } else {
      showMessage("Incorrect passphrase.");
    }
  };

  const logout = () => {
    setUserInfo([]);
    setLoggedIn(false);
    showMessage("Logged out.");
  };

  return (
    <div className="app">
      {message}
      <Router>
        <Menu loggedIn={loggedIn} logout={logout} />
        <div className="content">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Account
                  {...props}
                  loggedIn={loggedIn}
                  login={login}
                  userInfo={userInfo}
                />
              )}
            />
            <Route
              exact
              path="/wallet"
              render={(props) => (
                <Wallet
                  {...props}
                  loggedIn={loggedIn}
                  showMessage={showMessage}
                  userInfo={userInfo}
                  updateUserInfo={updateUserInfo}
                />
              )}
            />
            <Route
              exact
              path="/lisker"
              render={(props) => (
                <Lisker
                  {...props}
                  loggedIn={loggedIn}
                  showMessage={showMessage}
                  userInfo={userInfo}
                  updateUserInfo={updateUserInfo}
                />
              )}
            />
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
