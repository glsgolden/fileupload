import { BaseEntity } from './../../shared';

export class Participant implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public avatar?: string,
    ) {
    }
}
