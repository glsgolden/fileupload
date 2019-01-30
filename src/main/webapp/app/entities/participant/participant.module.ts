import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterfileuploadSharedModule } from '../../shared';
import {
    ParticipantService,
    ParticipantPopupService,
    ParticipantComponent,
    ParticipantDetailComponent,
    ParticipantDialogComponent,
    ParticipantPopupComponent,
    ParticipantDeletePopupComponent,
    ParticipantDeleteDialogComponent,
    participantRoute,
    participantPopupRoute,
    ParticipantResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...participantRoute,
    ...participantPopupRoute,
];

@NgModule({
    imports: [
        JhipsterfileuploadSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ParticipantComponent,
        ParticipantDetailComponent,
        ParticipantDialogComponent,
        ParticipantDeleteDialogComponent,
        ParticipantPopupComponent,
        ParticipantDeletePopupComponent,
    ],
    entryComponents: [
        ParticipantComponent,
        ParticipantDialogComponent,
        ParticipantPopupComponent,
        ParticipantDeleteDialogComponent,
        ParticipantDeletePopupComponent,
    ],
    providers: [
        ParticipantService,
        ParticipantPopupService,
        ParticipantResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterfileuploadParticipantModule {}
