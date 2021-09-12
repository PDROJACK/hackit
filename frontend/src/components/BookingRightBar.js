import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {confirmBooking} from '../actions/bookingActions'
import Booking from "../api/Booking";

const BookingRightBar = ({booking, confirmBooking}) => {

  const [err, setErr] = useState(null);

  useEffect(() => {
    console.log(booking.selectedSeats);
  }, []);

  const bookTicket = async () => {
    // SEND FINAL BOOKING REQUEST
    if(booking.bookingId === null){
      setErr(<p className="error">Please select a Seat first</p>);
    } else {
      let res = confirmBooking({ status: "book", bookingId: booking.bookingId });
      if(res){
        // redirect to congratulations page

      }
    }
  
  };

  return (
    <div className="container">
      <div className="row">Selected Seats</div>
      <div className="row">{booking.selectedSeats.map((s) => `${s+1} ,`)}</div>
      <div className="row">Total: ${booking.selectedSeats.length * 100}</div>
      <div className="row">
        <p className="btn btn-success" onClick={bookTicket}>Book Tickets</p>
        {err}
      </div>
    </div>
  );
};

function mapStateToProps(reducer) {
  return {
    booking: reducer.bookingReducer,
  };
}

export default connect(mapStateToProps, { confirmBooking })(BookingRightBar);
