package com.ocbc.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatRequest {
    private String user;
    private Integer seatNumber;
    private String operation;
}
