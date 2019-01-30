import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Participant } from './participant.model';
import { ParticipantPopupService } from './participant-popup.service';
import { ParticipantService } from './participant.service';

@Component({
    selector: 'jhi-participant-dialog',
    templateUrl: './participant-dialog.component.html'
})
export class ParticipantDialogComponent implements OnInit {

    participant: Participant;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private participantService: ParticipantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.participant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.participantService.update(this.participant));
        } else {
            this.subscribeToSaveResponse(
                this.participantService.create(this.participant));
        }
    }

    private subscribeToSaveResponse(result: Observable<Participant>) {
        result.subscribe((res: Participant) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Participant) {
        this.eventManager.broadcast({ name: 'participantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onFileChange(fileInput: any) {
        let files = fileInput.target.files[0];
        this.participantService.updateFile(this.participant, files);
    }
}

@Component({
    selector: 'jhi-participant-popup',
    template: ''
})
export class ParticipantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private participantPopupService: ParticipantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.participantPopupService
                    .open(ParticipantDialogComponent as Component, params['id']);
            } else {
                this.participantPopupService
                    .open(ParticipantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
