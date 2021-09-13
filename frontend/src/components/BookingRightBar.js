import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { confirmBooking, getTheatre } from "../actions/bookingActions";
import Booking from "../api/Booking";

const BookingRightBar = ({ booking, getTheatre, confirmBooking }) => {
  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {}, [status]);

  const bookTicket = async () => {
    // SEND FINAL BOOKING REQUEST
    setLoading(true);
    if (booking.bookingId === null) {
      setErr(<p className="error">Please select a Seat first</p>);
    } else {
      let res = confirmBooking({
        status: "book",
        bookingId: booking.bookingId,
      });
      if (res.status === 200) {
        setStatus("booked");
        setLoading(false);
      }
    }
  };

    return (
      <div className="container">
        <div className="row">Selected Seats</div>
        <div className="row">
          {booking.selectedSeats.map((s) => `${s + 1} ,`)}
        </div>
        <div className="row">Total: ${booking.selectedSeats.length * 100}</div>
        <div className="row">
          { status === "booked" && !loading ? (
            <p className="btn btn-danger">Booked</p>
          ) : (
            <p className="btn btn-success" onClick={bookTicket}>
              Book Tickets
            </p>
          )}
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

export default connect(mapStateToProps, { getTheatre, confirmBooking })(
  BookingRightBar
);
