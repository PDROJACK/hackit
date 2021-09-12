package com.ocbc.backend.service;

import java.util.List;
import java.util.Optional;

import com.ocbc.backend.entities.Theatre;
import com.ocbc.backend.repos.TheatreRepo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class TheatreService {

    @Autowired
    TheatreRepo repo;
    
    public List<Theatre> getAllTheatres(){
        return repo.findAll();
    }

    public Theatre saveTheatre(Theatre theatre){
        return repo.save(theatre);
    }

    public Theatre updateTheatre(Theatre theatre){
        return repo.save(theatre);
    }

    public Theatre getTheatre(String id){
         var theatre = repo.findById(new ObjectId(id));
         return theatre.get();
    }
}
