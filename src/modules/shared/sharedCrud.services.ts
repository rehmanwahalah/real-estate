import { Injectable } from '@nestjs/common';

@Injectable()
export class sharedCrudService {
  private service;
  constructor(private serviceObj) {
    // super();
    this.service = serviceObj;
  }
  sharedCreate = (body) => {
    return this.service.create(body);
  };
  sharedUpdate = (clause, body) => {
    return this.service.updateOne(clause, body);
  };
  sharedFindOne = (clause) => {
    return this.service.findOne(clause);
  };
  sharedFindOneAndUpdate = (clause, body, options) => {
    return this.service.findOneAndUpdate(clause, body, options);
  };
  sharedFind = (clause) => {
    return this.service.find(clause);
  };
  sharedDelete = (clause) => {
    return this.service.deleteOne(clause);
  };
}
