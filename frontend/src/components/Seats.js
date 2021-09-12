import "./Seats.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { selectSeat, getBooking, getTheatre, checkSeat } from "../actions/bookingActions";
import { connect } from "react-redux";
import Legends from './Legends'

const Seats = ({ booking, selectSeat, getBooking, getTheatre, checkSeat }) => {
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pickedSeats, setPickedSeats] = useState(booking.selectedSeats);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const seatsNumber = booking.seats.length;
    let tempGrid = [];
    let row = [];
    for (let key = 0; key < seatsNumber; key++) {
      if (key % 20 == 0) {
        tempGrid.push(row);
        row = [];
      }
      row.push({
        seat: key,
        state: booking.seats[key],
      });
    }
    setGrid(tempGrid);
  }, [booking.currentTheatre, booking.seats, booking.selectedSeats, refresh, pickedSeats]);

  const Seat = ({ seat, key }) => {
    const [st, setSt] = useState("");

    const pickSeat = async () => {
      // await getTheatre({theatreId: booking.currentTheatre});
      setPickedSeats(booking.selectedSeats);
      setLoading(true);
      let temp = pickedSeats;
      if (seat.state === "R") {
        if (temp.includes(seat.seat)) {
          selectSeat({
            seatNumber: seat.seat,
            operation: "remove",
            theatreId: booking.currentTheatre,
          });
        }
        setSt("");
      } else if (seat.state === "A") {
        let avail = await checkSeat({seatNumber: seat.seat, theatreId: booking.currentTheatre});
        if(avail){
          selectSeat({
            seatNumber: seat.seat,
            operation: "add",
            theatreId: booking.currentTheatre,
          });
          temp.push(seat.seat)
          setPickedSeats(temp);
          setSt("selected");
        }
      }

      Promise.all([
        await getBooking({ theatreId: booking.currentTheatre }),
        await getTheatre({ theatreId: booking.currentTheatre }),
      ]).then(() => {
        setLoading(false);
        setRefresh(!refresh);
      });
    };

    if (loading) {
      return null;
    } else {
      if (seat.state === "A") {
        return (
          <div className={`node ${st}`} key={key} onClick={pickSeat}>
            {seat.seat + 1}
          </div>
        );
      } else if (
        seat.state === "R" &&
        pickedSeats.includes(seat.seat)
      ) {
        return (
          <div className="node selected" key={key} onClick={pickSeat}>
            {seat.seat + 1}
          </div>
        );
      } else if (seat.state === "R") {
        return (
          <div className="node reserved" key={key}>
            {seat.seat + 1}
          </div>
        );
      } else {
        return (
          <div className="node reserved" key={key}>
            {seat.seat + 1}
          </div>
        );
      }
    }
  };

  const layGrid = () => {
    return grid.map((row, rowId) => {
      return (
        <div key={rowId}>
          {row.map((seat, seatId) => {
            return <Seat seat={seat} key={seatId} />;
          })}
        </div>
      );
    });
  };

  return (
    <>
      <div className="grid">
        <img
          src="https://1.bp.blogspot.com/--rmycgzN5WE/XrJIfs9sK-I/AAAAAAAAFNk/5cgxVYdfwHwOhzrVTrB3MjPnjjNdn1SwQCLcBGAsYHQ/s1600/trapezoid.png"
          height="150"
          width="400"
        />
        {booking.seats ? layGrid() : null}
      </div>
    </>
  );
};

function mapStateToProps(reducer) {
  return {
    booking: reducer.bookingReducer,
  };
}

export default connect(mapStateToProps, { selectSeat, getBooking, getTheatre, checkSeat })(
  Seats
);
