import React, {useEffect} from 'react'
import { connect } from 'react-redux';

const MovieLeftBar = ({booking}) => {

    useEffect(() => {
        console.log(booking.theatreMovieName)
    }, [])

    return (
        <>
            <img src={booking.poster} width={200} height={300} />
            <h5>{booking.theatreName}</h5>
            <h5>{booking.theatreMovieName}</h5>
        </>
    )
}

const mapStateToProps = (reducer) => {
    return {
        booking: reducer.bookingReducer 
    }
}

export default connect(mapStateToProps, {})(MovieLeftBar);
