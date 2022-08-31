import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { accountBalance, logout } from "../../utils/near";
import "./Navigation.scss";

const Navigation = () => {
  const account = window.walletConnection.account();
  const [bal, setBal] = useState("0");
  const navigate = useNavigate();

  const getBal = useCallback(async () => {
    if (account.accountId) {
      setBal(await accountBalance());
    }
  });

  const destroy = () => {
    logout();
    navigate("/welcome");
  };

  useEffect(() => {
    getBal();
  }, [getBal]);
  return (
    <>
      <div className="app__nav">
        <div className="nav-logo">NBlog</div>
        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/write">
            Write
          </Link>
        </div>
        <div className="nav-end">
          <div className="nav-end--profile">
            {window.accountId} | {bal} NEAR
          </div>
          <div className="nav-end--logout" onClick={() => destroy()}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
