import React from "react";

import "./SpinnerLoader.scss";

const SpinnerLoader = () => {
  return (
    <div className="SpinnerLoader">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoader;
