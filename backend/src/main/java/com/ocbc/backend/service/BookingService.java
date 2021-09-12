package com.ocbc.backend.service;

import java.util.Optional;
import java.util.List;

import com.ocbc.backend.entities.Booking;
import com.ocbc.backend.repos.BookingRepo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    
    @Autowired
    BookingRepo repo;

    public List<Booking> getAllBookings(){
        return repo.findAll();
    }

    public Booking getOneBooking(String id){
        Optional<Booking> booking = repo.findById(new ObjectId(id));
        return booking.isPresent() ? booking.get() : null;
    }

    public Booking saveBooking(Booking booking){
        return repo.save(booking); 
    }

    public Booking updateBooking(Booking booking){
        return repo.save(booking);
    }

    public Booking getBookingByUserAndTheatre(String theatreId, String userId){
        return repo.findBookingByUserAndTheatre(theatreId, userId);
    }

    public void deleteBooking(String id){
        repo.deleteById(new ObjectId(id));
    }

}
