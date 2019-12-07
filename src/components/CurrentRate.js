import React from "react";
import { connect } from "react-redux";

// import styled from "styled-components";

const CurrentRate = ({ data }) => {
  return (
    <div>
      <h1>1 EURO = {data.mid ? data.mid : "-"} PLN</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading
});

export default connect(mapStateToProps)(CurrentRate);
