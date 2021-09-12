import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import BookingRightBar from "./BookingRightBar";
import Seats from './Seats'
import "./Seats.css";
import {connect} from 'react-redux';
import MovieLeftBar from './MovieLeftBar';
import { getTheatre, getBooking } from "../actions/bookingActions";

const Theatre = ({booking, getBooking}) => {
  
  useEffect(()=>{
      getBooking({ theatreId: booking.currentTheatre });
  },[])

  return (
    <>
      <div className="row fill-window">
        <div className="col-4 movie">
            <MovieLeftBar/> 
        </div>

        <div className="col-4 theatre d-flex flex-column justify-content-center">
            <Seats />
        </div>

        <div className="col-4 booking">
          <BookingRightBar />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (reducer) => {
    return {
        booking: reducer.bookingReducer
    }
}

export default connect(mapStateToProps,{ getBooking })(Theatre);
