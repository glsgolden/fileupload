package com.jhipsterfileupload.service;

import com.jhipsterfileupload.service.dto.ParticipantDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service Interface for managing Participant.
 */
public interface ParticipantService {

    /**
     * Save a participant.
     *
     * @param participantDTO the entity to save
     * @return the persisted entity
     */
    ParticipantDTO save(ParticipantDTO participantDTO);

    /**
     *  Get all the participants.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ParticipantDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" participant.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ParticipantDTO findOne(String id);

    /**
     *  Delete the "id" participant.
     *
     *  @param id the id of the entity
     */
    void delete(String id);

    ParticipantDTO uploadAvatar(String id, MultipartFile file);
}
