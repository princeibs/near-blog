import React from "react";
import { login } from "../../utils/near";
import "./Welcome.scss";

const Welcome = () => {
  return (
    <div className="app__welcome">
      <div className="welcome-title">
        Welcome to <span>Near Blog</span>
      </div>
      <div className="welcome-sub">
        The leading decentralised blogging platform
      </div>
      <img src="https://picsum.photos/500/500" />
      <div className="welcome-text">
        You need to <span onClick={() => login()}>log in</span> to continue
      </div>
    </div>
  );
};

export default Welcome;
