package com.ocbc.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    private String _id;
    private String theatreId;
    private String userId;
    private List<Integer> seats;
    private String status;

    public Booking(String theatreId, String userId, List<Integer> seats, String status) {
        this.theatreId = theatreId;
        this.userId = userId;
        this.seats = seats;
        this.status = status;
    }

    
}
