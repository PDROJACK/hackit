package com.ocbc.backend.controller;

import java.util.List;

import com.ocbc.backend.entities.Booking;
import com.ocbc.backend.entities.MessageDetail;
import com.ocbc.backend.entities.Theatre;
import com.ocbc.backend.service.TheatreService;
import com.ocbc.backend.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class BookingController {

    @Autowired
    TheatreService theatreService;

    @Autowired
    BookingService bookingService;

    @GetMapping("/bookings")
    public List<Booking> getBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/booking/{theatreId}/{userId}")
    public ResponseEntity<?> getBookingByUserAndMovie(@PathVariable String theatreId, @PathVariable String userId ) {

        Booking booking = bookingService.getBookingByUserAndTheatre(theatreId, userId);
        
        // if(booking == null){
        //     return ResponseEntity.status(HttpStatus.OK).body(booking);
        // }

        return ResponseEntity.status(HttpStatus.OK).body(booking);
        
    }

    @GetMapping("/booking/{bookingId}")
    public Booking getBooking(@PathVariable String bookingId) {
        return bookingService.getOneBooking(bookingId);
    }    

    @PutMapping("/booking/{bookingId}")
    public ResponseEntity<?> confirmBooking(@PathVariable String bookingId, @RequestBody String status) {

        MessageDetail message = new MessageDetail();
        Booking booking = bookingService.getOneBooking(bookingId);
        
        if(booking == null){
            message.setMessage("Booking not found");
            message.setCode(400);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
        
        Theatre theatre = theatreService.getTheatre(booking.getTheatreId());

        StringBuilder sb = new StringBuilder(theatre.getSeats());

        for(Integer i: booking.getSeats()){
            sb.setCharAt(i, 'B');
        }

        theatre.setSeats(sb.toString());
        booking.setStatus("booked");

        theatreService.saveTheatre(theatre);
        bookingService.updateBooking(booking);

        message.setMessage("booked");
        message.setCode(200);

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

}
