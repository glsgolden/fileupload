package com.jhipsterfileupload.service.mapper;

import com.jhipsterfileupload.domain.*;
import com.jhipsterfileupload.service.dto.ParticipantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Participant and its DTO ParticipantDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ParticipantMapper extends EntityMapper <ParticipantDTO, Participant> {
    
    

}
