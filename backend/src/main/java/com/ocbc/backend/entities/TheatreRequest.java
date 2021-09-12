package com.ocbc.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TheatreRequest {
    private String name;
    private String movieName;
    private String location;
    private String poster;
}
