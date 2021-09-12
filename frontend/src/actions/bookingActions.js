import Booking from "../api/Booking";

export const getBooking = (data) => async (dispatch) => {
    const action = { type: "getBooking", data: {
        seats: [],
        _id: null,
        status: null
    } }
    const userId = localStorage.getItem("user");
    const {theatreId} = data;

    const res = await Booking.get(`/booking/${theatreId}/${userId}`);

    if(res.status===200){
        action.data = {
            seats: res.data.seats ? res.data.seats : [],
            _id: res.data._id ? res.data._id: null,
            status: res.data.status ? res.data.status: null
        }

        dispatch(action);
    }

}

export const setCurrentTheatre = (data) => async (dispatch) => {
    const action = { type: "setCurrentTheatre" , data: { theatreId: data.theatreId}}
    dispatch(action);
}

export const getTheatres = (data) => async (dispatch) => {
    const action = { type: "getTheatres"  }
    
    // Send request to get all theatres 
    let res = await Booking.get("/theatres");

    if(res.status === 200){
        action.data = res.data;   
        dispatch(action);
    }
}

export const getTheatre = (data) => async (dispatch) => {
    const action = { type: "getTheatre" }
    const {theatreId} = data
    let res = await Booking.get(`/theatre/${theatreId}`);
    
    if(res.status === 200){
        console.log(res);
        action.data = res.data;
        dispatch(action);
        return true;
    }
    return false;
}

export const checkSeat = (data) => async (dispatch) => {
    const {theatreId, seatNumber} = data;
    const action = {type: "checkSeat"}

    let res = await Booking.get(`/theatre/${theatreId}/${seatNumber}`)

    console.log(res);
    if(res.status === 200){
        dispatch(action)
        return res.data;
    }
}

export const selectSeat = (data) => async (dispatch) => {
    const action = { type: "selectSeat" }

    const user = localStorage.getItem("user");
    const {seatNumber, operation, theatreId} = data

    // Send request to manipulate seat
    let res = await Booking.put(`/theatre/${theatreId}`, {
        seatNumber,
        user,
        operation
    })

    if(res.status === 200){
        action.data = {
            seats: res.data.seats ? res.data.seats : []
        }
        getBooking({theatreId});
        getTheatre({theatreId});
    }
    dispatch(action);
}

export const confirmBooking = (data) => async (dispatch) => {
    const action = { type: "confirmBooking" }
    
    const { status, bookingId } = data;

    let res = await Booking.put(`/booking/${bookingId}`,{
        status
    })
    
    dispatch(action);
    if(res.status === 200) return true;
}