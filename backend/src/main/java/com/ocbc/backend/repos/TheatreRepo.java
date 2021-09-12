package com.ocbc.backend.repos;
import com.ocbc.backend.entities.Theatre;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheatreRepo extends MongoRepository<Theatre, ObjectId> {}