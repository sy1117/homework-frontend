import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Event } from "../entity/Event";

export class EventController {

    private eventRepository = getRepository(Event);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.eventRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.eventRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let data = request.body;
        return this.eventRepository.save(data);
    }

    async modify(request: Request, response: Response, next: NextFunction) {
        let _event = await this.eventRepository.findOne(request.params.id)
        _event  = {
            ..._event,
            ...request.body,
        }
        let data = request.body;
        return this.eventRepository.save(_event);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let eventToRemove = await this.eventRepository.findOne(request.params.id);
        return await this.eventRepository.remove(eventToRemove)
    }

    async removeAll(request: Request, response: Response, next: NextFunction) {
        return this.eventRepository.delete({})
    }

}