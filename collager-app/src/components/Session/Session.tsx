import React from "react";

import ActiveSession from "./ActiveSession";
import InvalidSession from "./InvalidSession";
import { useParams } from "react-router-dom";
import { useSocketSession } from "../../hooks/socket";

import "./Session.scss";

const Session = () => {
  const { id } = useParams<{ id: string }>();

  const [isChecked, isValid] = useSocketSession(id);

  if (isChecked) {
    return isValid ? <ActiveSession /> : <InvalidSession />;
  }
  else {
    return (
      <div className="session--loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Session;
