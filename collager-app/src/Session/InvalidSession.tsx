import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

import "./InvalidSession.scss";

const InvalidSession = () => {
  return (
    <div className="invalid-session">
      <div className="invalid-session-content">
        <BsExclamationCircle />

        <div>Invalid session</div>
      </div>
    </div>
  )
};

export default InvalidSession;
