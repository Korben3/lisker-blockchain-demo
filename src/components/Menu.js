import React, { useEffect, useState } from "react";
import "./Menu.css";
import { ReactComponent as Gear } from "../assets/icons/gear.svg";
import { ReactComponent as Wallet } from "../assets/icons/wallet.svg";
import { ReactComponent as Person } from "../assets/icons/person.svg";
import { ReactComponent as Question } from "../assets/icons/question-circle.svg";
import { ReactComponent as Exit } from "../assets/icons/box-arrow-right.svg";
import { NavLink, useLocation } from "react-router-dom";

const Menu = ({ loggedIn, logout }) => {
  let page = useLocation().pathname;
  page = page.substr(1);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (page) {
      setActive(page);
    } else {
      setActive("account");
    }
  }, [page]);

  const changeActive = (option) => {
    setActive(option);
  };

  return (
    <div className="sidebar">
      <div className="title">Lisker Blockchain Demo</div>
      <NavLink to="/">
        <div
          className={`menuOption ${active === "account" ? "active" : ""}`}
          onClick={() => changeActive("account")}
        >
          <Gear />
          &nbsp;Account
        </div>
      </NavLink>
      <NavLink to="/wallet">
        <div
          className={`menuOption ${active === "wallet" ? "active" : ""}`}
          onClick={() => changeActive("wallet")}
        >
          <Wallet />
          &nbsp;Wallet
        </div>
      </NavLink>
      <NavLink to="/lisker">
        <div
          className={`menuOption ${active === "lisker" ? "active" : ""}`}
          onClick={() => changeActive("lisker")}
        >
          <Person />
          &nbsp;Lisker
        </div>
      </NavLink>
      <NavLink to="/about">
        <div
          className={`menuOption ${active === "about" ? "active" : ""}`}
          onClick={() => changeActive("about")}
        >
          <Question />
          &nbsp;About
        </div>
      </NavLink>
      {loggedIn ? (
        <div className="menuOption" onClick={logout}>
          <Exit />
          &nbsp;Logout
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Menu;
