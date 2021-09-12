package com.ocbc.backend.repos;

import com.ocbc.backend.entities.Booking;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * BookingRepo
 */
@Repository
public interface BookingRepo extends MongoRepository<Booking, ObjectId> {

    @Query(value="{ $and: [{ 'theatreId': ?0 }, { 'userId': ?1 }] }")
    Booking findBookingByUserAndTheatre(String theatreId, String userId);

}