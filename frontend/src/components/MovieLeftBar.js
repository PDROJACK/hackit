import React, { useEffect } from "react";
import { connect } from "react-redux";

const MovieLeftBar = ({ booking }) => {
  useEffect(() => {}, []);

  return (
    <div className="d-flex flex-row movie-details">
      <div className="poster">
        <img src={booking.poster} width={200} height={300} />
      </div>
      <div className="details">
        <h5>{booking.theatreMovieName}</h5>
        <h5>{booking.theatreName}</h5>
      </div>
    </div>
  );
};

const mapStateToProps = (reducer) => {
  return {
    booking: reducer.bookingReducer,
  };
};

export default connect(mapStateToProps, {})(MovieLeftBar);
