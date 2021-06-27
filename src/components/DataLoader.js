import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const DataLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <FadeLoader
        color={"#02376D"}
        size={150}
        height={20}
        width={5}
        radius={2}
        margin={2}
      />
      <span style={{ display: "block" }}>
        <h3>Fetching data...</h3>
      </span>
    </div>
  );
};
export default DataLoader;
