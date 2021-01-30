import React, { useState } from "react";
import "./Lisker.css";
import LiskerGenerator from "../LiskerGenerator";
import * as api from "../utils/api.js";
import { transactions } from "@liskhq/lisk-client";

const Lisker = ({ loggedIn, showMessage, userInfo, updateUserInfo }) => {
  const [newLiskerId, setNewLiskerId] = useState("");

  const getLiskerId = (liskerId) => {
    setNewLiskerId(liskerId);
  };

  const registerLisker = async () => {
    // todo: use dynamic fee
    if (!loggedIn) {
      showMessage("To register a Lisker, please login.");
    } else {
      console.log("App - " + newLiskerId);
      // perform lisker transaction
      const client = await api.getClient();

      const tx = await client.transaction.create(
        {
          moduleID: 2000,
          assetID: 0,
          fee: BigInt(transactions.convertLSKToBeddows("0.1")),
          asset: {
            liskerId: newLiskerId,
          },
        },
        userInfo.passphrase
      );
      console.log(tx);

      client.transaction
        .send(tx)
        .then((res) => {
          console.log(res);
          updateUserInfo(newLiskerId, 0);
          showMessage("Lisker registered.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="LiskerGenerator">
        <LiskerGenerator
          getLiskerId={getLiskerId}
          setLiskerId={userInfo.liskerId}
        />
        <button onClick={registerLisker}>
          Register Lisker to user account
        </button>
      </div>
    </div>
  );
};
export default Lisker;
