import React, { useState, useEffect } from "react";
import "./Wallet.css";
import LiskerViewer from "../LiskerViewer";
import { cryptography, transactions } from "@liskhq/lisk-client";
import * as api from "../utils/api.js";

const Wallet = ({ loggedIn, userInfo, updateUserInfo, showMessage }) => {
  const [userAmount, setUserAmount] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [transactionRows, setTransactionRows] = useState([]);

  const buildTable = async () => {
    const getLiskerID = async (liskAddress) => {
      const account = await api.getAccount(liskAddress);
      let liskerId = account.lisker.liskerId;
      return liskerId;
    };

    // retrieve the last transactions of account (using dummy tx's until release of service).
    const transactions = [
      {
        liskerId: "",
        senderPublicKey:
          "8bc07fb73b6fdc8a7d44758cee36c7bbe4b25ebd47c29a2f05320b46d208a16d",
        amount: "50",
        fee: "0.021",
      },
      {
        liskerId: "",
        senderPublicKey:
          "90b910219ab55b718293398aa48d5049a5c5e9872ff399e4d33f71de1c8c7a7f",
        amount: "150",
        fee: "0.05",
      },
      {
        liskerId: "",
        senderPublicKey:
          "1024dcd7923c4a412d8740769dc7dcd5448f461d5e00f986a68df9a844e093a7",
        amount: "-5",
        fee: "0.05",
      },
      {
        liskerId: "",
        senderPublicKey:
          "90b910219ab55b718293398aa48d5049a5c5e9872ff399e4d33f71de1c8c7a7f",
        amount: "20",
        fee: "0.05",
      },
    ];

    // retrieve the liskerId's of senders and build tx table
    let liskAddress;
    let liskerId;
    let key = 0;
    let newTransactionRows = [];
    for (let transaction of transactions) {
      liskAddress = cryptography
        .getBase32AddressFromPublicKey(
          cryptography.hexToBuffer(transaction.senderPublicKey)
        )
        .toString("hex");
      liskerId = await getLiskerID(liskAddress);
      console.log(liskerId);
      key++;
      newTransactionRows.push(
        <tr key={key}>
          <td>
            {" "}
            <LiskerViewer className="App" size="40" setLiskerId={liskerId} />
          </td>
          <td className="txAddress">{liskAddress}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.fee}</td>
        </tr>
      );
    }
    setTransactionRows(newTransactionRows);
  };

  useEffect(() => {
    if (loggedIn) {
      buildTable();
    }
  }, []);

  const amountChange = (data) => {
    setUserAmount(data.target.value.trim());
  };

  const addressChange = (data) => {
    setUserAddress(data.target.value.trim());
  };

  const handleSubmit = async () => {
    const client = await api.getClient();
    let address;
    try {
      address = cryptography.getAddressFromBase32Address(userAddress);
    } catch {
      showMessage("Incorrect wallet address.");
      return;
    }

    const tx = await client.transaction.create(
      {
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows("0.1")),
        asset: {
          amount: BigInt(transactions.convertLSKToBeddows(userAmount)),
          recipientAddress: address,
          data: "",
        },
      },
      userInfo.passphrase
    );
    try {
      await client.transaction.send(tx);
      updateUserInfo("", userAmount);
      showMessage("Transaction sent.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Wallet</h2>
      </div>
      {!loggedIn ? (
        <div>
          <p>Please login to your account.</p>
        </div>
      ) : (
        <div>
          <div className="userTableWallet">
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
          <div>
            Transfer
            <input
              type="text"
              className="amountField"
              id="amount"
              onChange={amountChange}
            />
            LSKR to address
            <input
              type="text"
              className="addressField"
              id="address"
              onChange={addressChange}
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Fee</th>
                </tr>
                {transactionRows}
              </tbody>
            </table>
            <div className="dummyNote">Note: dummy transactions.</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Wallet;
