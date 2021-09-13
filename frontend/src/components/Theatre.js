import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import BookingRightBar from "./BookingRightBar";
import Seats from "./Seats";
import "./Seats.css";
import { connect } from "react-redux";
import MovieLeftBar from "./MovieLeftBar";
import { getTheatre, getBooking } from "../actions/bookingActions";
import Legends from "./Legends";

const Theatre = ({ booking, getBooking }) => {
  useEffect(() => {
    getBooking({ theatreId: booking.currentTheatre });
  }, []);

  return (
    <>
      <div className="row fill-window">
        <div className="col-4 movie">
          <MovieLeftBar />
        </div>
        <div className="col-4 theatre d-flex flex-column justify-content-center">
          <img
            src="https://1.bp.blogspot.com/--rmycgzN5WE/XrJIfs9sK-I/AAAAAAAAFNk/5cgxVYdfwHwOhzrVTrB3MjPnjjNdn1SwQCLcBGAsYHQ/s1600/trapezoid.png"
            height="150"
            width="400"
          />
          <p>this way screen </p>
          <Seats />
          <br />
          <Legends />
        </div>

        <div className="col-4 booking">
          <BookingRightBar />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (reducer) => {
  return {
    booking: reducer.bookingReducer,
  };
};

export default connect(mapStateToProps, { getBooking })(Theatre);
