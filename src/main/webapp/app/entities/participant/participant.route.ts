import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ParticipantComponent } from './participant.component';
import { ParticipantDetailComponent } from './participant-detail.component';
import { ParticipantPopupComponent } from './participant-dialog.component';
import { ParticipantDeletePopupComponent } from './participant-delete-dialog.component';

@Injectable()
export class ParticipantResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const participantRoute: Routes = [
    {
        path: 'participant',
        component: ParticipantComponent,
        resolve: {
            'pagingParams': ParticipantResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterfileuploadApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'participant/:id',
        component: ParticipantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterfileuploadApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const participantPopupRoute: Routes = [
    {
        path: 'participant-new',
        component: ParticipantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterfileuploadApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'participant/:id/edit',
        component: ParticipantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterfileuploadApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'participant/:id/delete',
        component: ParticipantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterfileuploadApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
