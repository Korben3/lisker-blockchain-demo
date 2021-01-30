import React, { useState } from "react";
import "./Account.css";
import * as passphrase from "@liskhq/lisk-passphrase";
import * as cryptography from "@liskhq/lisk-cryptography";
import LiskerViewer from "../LiskerViewer";

const Account = ({ loggedIn, userInfo, login }) => {
  const [accountDetails, setAccountDetails] = useState("");
  const [userPassphrase, setUserPassphrase] = useState("");

  const newAccount = () => {
    let pass = passphrase.Mnemonic.generateMnemonic();
    const newAccountDetails = (
      <div>
        <span className="subText">Lisk address: </span>
        {cryptography.getBase32AddressFromPassphrase(pass)}
        <br />
        <span className="subText">Binary address: </span>
        {cryptography.getAddressFromPassphrase(pass).toString("hex")}
        <br />
        <span className="subText">Passphrase: </span>
        {pass}
      </div>
    );
    setAccountDetails(newAccountDetails);
  };

  const handleChange = (data) => {
    setUserPassphrase(data.target.value.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userPassphrase);
  };

  return (
    <div>
      <div>
        <h2>Account</h2>
      </div>

      {!loggedIn ? (
        <div>
          <div>
            <p>Login or generate a new account.</p>
          </div>
          <div>
            <input type="text" id="passhphrase" onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
          </div>
          <div>
            <button onClick={newAccount}>Generate new account</button>
          </div>
          <div>{accountDetails}</div>
        </div>
      ) : (
        <div>
          <div>
            <p>Welcome {userInfo.address}!</p>
          </div>
          <div className="userTable">
            <div>
              <LiskerViewer
                className="App"
                size="150"
                setLiskerId={userInfo.liskerId}
              />
            </div>
            <div className="balance">
              <h4>Balance: {userInfo.balance} LSKR</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Account;
