package com.jhipsterfileupload.service.impl;

import com.jhipsterfileupload.service.ParticipantService;
import com.jhipsterfileupload.domain.Participant;
import com.jhipsterfileupload.repository.ParticipantRepository;
import com.jhipsterfileupload.service.dto.ParticipantDTO;
import com.jhipsterfileupload.service.mapper.ParticipantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


/**
 * Service Implementation for managing Participant.
 */
@Service
public class ParticipantServiceImpl implements ParticipantService{

    private static final String UPLOADED_FOLDER = "C://temp//";

    private final Logger log = LoggerFactory.getLogger(ParticipantServiceImpl.class);

    private final ParticipantRepository participantRepository;

    private final ParticipantMapper participantMapper;

    public ParticipantServiceImpl(ParticipantRepository participantRepository, ParticipantMapper participantMapper) {
        this.participantRepository = participantRepository;
        this.participantMapper = participantMapper;
    }

    /**
     * Save a participant.
     *
     * @param participantDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ParticipantDTO save(ParticipantDTO participantDTO) {
        log.debug("Request to save Participant : {}", participantDTO);
        Participant participant = participantMapper.toEntity(participantDTO);
        participant = participantRepository.save(participant);
        return participantMapper.toDto(participant);
    }

    /**
     *  Get all the participants.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    public Page<ParticipantDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Participants");
        return participantRepository.findAll(pageable)
            .map(participantMapper::toDto);
    }

    /**
     *  Get one participant by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    public ParticipantDTO findOne(String id) {
        log.debug("Request to get Participant : {}", id);
        Participant participant = participantRepository.findOne(id);
        return participantMapper.toDto(participant);
    }

    /**
     *  Delete the  participant by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Participant : {}", id);
        participantRepository.delete(id);
    }

    public ParticipantDTO uploadAvatar(String id, MultipartFile file) {

        log.debug("Uploading avatar");
        Participant participant = participantRepository.findOne(id);
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);
            participant.setAvatar(UPLOADED_FOLDER + file.getOriginalFilename());
            participantRepository.save(participant);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return participantMapper.toDto(participant);
    }
}
