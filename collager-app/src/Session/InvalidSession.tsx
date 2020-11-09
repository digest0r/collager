import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

import "./InvalidSession.scss";

const InvalidSession = () => {
  return (
    <div className="InvalidSession">
      <div className="InvalidSession-content">
        <BsExclamationCircle />

        <div>Invalid session</div>
      </div>
    </div>
  )
};

export default InvalidSession;
