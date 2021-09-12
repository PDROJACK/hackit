package com.ocbc.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Theatre {
    @Id
    private String _id;
    private String name;
    private String movieName;
    private String location;
    private String poster;
    private String seats;

    public Theatre(String name, String movieName, String location, String seats, String poster) {
        this.name = name;
        this.movieName = movieName;
        this.location = location;
        this.seats = seats;
        this.poster = poster;
    }
    
}

/**
 * 
 * A
 * B
 * P
 * 
 * AAAAAAAAAA
 * APPAPAPAPA
 * AAAPAPPAPA
 * APPPAAAAPA
 * APPAPPPPAP
 * 
 * 
 */