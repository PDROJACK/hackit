package com.ocbc.backend.controller;

import java.util.ArrayList;
import java.util.List;
import com.ocbc.backend.entities.Booking;
import com.ocbc.backend.entities.MessageDetail;
import com.ocbc.backend.entities.SeatRequest;
import com.ocbc.backend.entities.Theatre;
import com.ocbc.backend.entities.TheatreRequest;
import com.ocbc.backend.service.TheatreService;
import com.ocbc.backend.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin("*")
@Log4j
public class TheatreController {

    @Autowired
    TheatreService service;

    @Autowired
    BookingService bookingService;

    @GetMapping("/health")
    public String health(){
        return "Service up";
    }

    @GetMapping("/theatre/{theatreId}")
    public Theatre getTheatre(@PathVariable String theatreId) {
            return service.getTheatre(theatreId);
    }

    @GetMapping("/theatres")
    public List<Theatre> getAllTheatres(){
        return service.getAllTheatres();
    }

    @PostMapping("/theatre")
    public Theatre insertTheatre(@RequestBody TheatreRequest theatreRequest){
        String seats = "";
        for(int i=0;i<50;i++) {
            seats = seats + "A";
        } 
        log.info(seats.length());
        return service.saveTheatre(new Theatre(theatreRequest.getName(), theatreRequest.getMovieName(), theatreRequest.getLocation(), seats, theatreRequest.getPoster()));
    }

    @PutMapping("/theatre/{id}")
    public ResponseEntity<?> selectSeat(@PathVariable String id, @RequestBody SeatRequest seatRequest) {

        MessageDetail message = new MessageDetail();
        var theatre = service.getTheatre(id);
        var seatNumber = seatRequest.getSeatNumber();
        var user = seatRequest.getUser();
        var operation = seatRequest.getOperation();

        if(theatre==null){
            message.setMessage("Theatre Not Found");
            message.setCode(400);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

        StringBuilder sb = new StringBuilder(theatre.getSeats());
        String seats = theatre.getSeats();
        char seat = seats.charAt(seatNumber);

        if(operation.equals("add")){
            if(seat == 'A'){
                sb.setCharAt(seatNumber, 'R');
                theatre.setSeats(sb.toString());
                service.updateTheatre(theatre);
                message.setMessage("updated seat");
            } else {
                message.setMessage("already taken");
                message.setCode(400);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
            }
        } else {
            sb.setCharAt(seatNumber, 'A');
            theatre.setSeats(sb.toString());
            service.updateTheatre(theatre);
            message.setMessage("removed seats");
        }

        Booking booking = bookingService.getBookingByUserAndTheatre(id, user);

        if(booking == null ){   
            if(operation.equals("add")){
                bookingService.saveBooking(new Booking(id,
                user,
                new ArrayList<>(List.of(seatNumber)),
                "pending"
                ));
            }
        } else {
            if(operation.equals("add")){
                if(booking.getSeats().contains(seatNumber)){
                    message.setMessage("already selected");
                } else {
                    booking.getSeats().add(seatNumber);
                    bookingService.saveBooking(booking);
                    message.setMessage("seat selected");
                }
            } else {
                if(booking.getSeats().contains(seatNumber)){
                    if(booking.getSeats().size() == 1){
                        bookingService.deleteBooking(booking.get_id());
                    } else {
                        booking.getSeats().remove(seatNumber);
                        bookingService.saveBooking(booking); 
                    }
                    message.setMessage("removed seat");
                }
            }
        }

        booking = bookingService.getBookingByUserAndTheatre(id, user);

        message.setCode(200);
        
        return ResponseEntity.status(HttpStatus.OK).body(booking);
    }


    @GetMapping("/theatre/{theatreId}/{seat}")
    public Boolean checkSeat(@PathVariable String theatreId, @PathVariable Integer seat) {
        Theatre theatre = service.getTheatre(theatreId);
        char seatStatus = theatre.getSeats().charAt(seat);
        return seatStatus == 'A';
    }

}
