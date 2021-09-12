const initialState = { user: null,selectedSeats: [], theatres: [], currentTheatre: "", seats: "", theatreName: "", theatreMovieName: "", bookingId: null}


/***
 * 
 *  state = {
 *     
 *      user: 123,
 *      theatres: [...],
 *      currentTheatre: 456,
 *      theatreMovieName
 *      theatreName
 *      seats: ""c
 *      selectedSeats: [12,3,4],
 *      bookingId: 123 
 *  }
 * 
 */
const bookingReducer = (state=initialState, action) => {
    switch (action.type) {
        case "getBooking":

            return {...state, selectedSeats: action.data.seats, bookingId: action.data._id, status: action.data.status}

        case "setCurrentTheatre":
            return {...state, currentTheatre: action.data.theatreId}

        case "getTheatres":
            return {...state, theatres: action.data }

        case "getTheatre":
            return {...state, currentTheatre: action.data._id, theatreName: action.data.name, theatreMovieName: action.data.movieName, seats: action.data.seats, poster: action.data.poster}
   
        case "selectSeat":
            return {...state, selectedSeats: action.data.seats }

        case "confirmBooking":
            return state 

        default:
            return state;
    }
}


export default bookingReducer;