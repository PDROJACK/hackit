import React from "react";
import "./Seats.css";

function Legends() {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <div className="node reserved"></div>
        <p>Booked</p>
      </div>

      <div className="d-flex">
        <div className="node available"></div>
        <p>Available</p>
      </div>

      <div className="d-flex">
        <div className="node selected"></div>
        <p>Selected</p>
      </div>
    </div>
  );
}

export default Legends;
