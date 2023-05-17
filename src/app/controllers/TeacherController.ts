import { Teacher } from './../../domain/entities/Teacher';
import { ITeacherRepository } from "domain/interfaces/ITeacherRepository";
import { Request, Response } from "express";
import { json } from 'stream/consumers';

export class TeacherController {

    constructor(private _teacherRepository: ITeacherRepository) {
    }

    public async create(request: Request, response: Response): Promise<Response> {

        try {

            const { name, description, email, birthDate } = request.body;
            const teacher: Teacher = new Teacher(name, description, email, new Date(birthDate));
            const createdTeacher = await this._teacherRepository.create(teacher);
            return response.status(201).json(createdTeacher);

        } catch (error) {

            console.log(error);// nunca mostrar los errores, ahora por que estamos explicando
            return response.status(500).json(
                {
                    errorMessage: 'Houston tenemos un problema',
                    code: 9999
                }
            );

        }

    }
}
