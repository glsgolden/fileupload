package com.jhipsterfileupload.repository;

import com.jhipsterfileupload.domain.Participant;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Participant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipantRepository extends MongoRepository<Participant, String> {

}
