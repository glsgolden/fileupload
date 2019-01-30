import {Injectable} from '@angular/core';

import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';

import {Participant} from './participant.model';
import {ResponseWrapper, createRequestOption} from '../../shared';

@Injectable()
export class ParticipantService {

    private resourceUrl = SERVER_API_URL + 'api/participants';

    constructor(private http: Http) {
    }

    create(participant: Participant): Observable<Participant> {
        const copy = this.convert(participant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(participant: Participant): Observable<Participant> {
        const copy = this.convert(participant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Participant> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Participant.
     */
    private convertItemFromServer(json: any): Participant {
        const entity: Participant = Object.assign(new Participant(), json);
        return entity;
    }

    /**
     * Convert a Participant to a JSON which can be sent to the server.
     */
    private convert(participant: Participant): Participant {
        const copy: Participant = Object.assign({}, participant);
        return copy;
    }

    updateFile = (participant: Participant, file) => {
        let headers = new Headers();
        let formData: FormData = new FormData();
        formData.append('avatar', file);

        // headers.append('enctype', 'multipart/form-data'); don't need since Angular 4
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this.http.post( 'http://localhost:8080/api/participants/' + participant.id + '/image', formData, options).map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}
