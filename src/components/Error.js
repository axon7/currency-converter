import React from "react";
import PropTypes from "prop-types";

const Error = ({ error }) => {
  return (
    <div>
      <h1>{error}</h1>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.string
};

export default Error;
