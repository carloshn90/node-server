
import { Request, Response } from 'express';
import {LOGGER} from '../config/logger.config';
import {validationResult} from 'express-validator';
import {UserService} from '../services/user.service';
import {ApiErrorModel} from '../models/api.error.model';

export class AuthController {

    logger = LOGGER.child({ class: 'AuthController' });
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login = async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            this.logger.error('Validation errors: ', errors.array());
            res.status(422).json({ errors: errors.array() });
        } else {
            this.userService
                .login(req.body.email, req.body.passwordHash)
                .then((jwtToken: string) => res.send(jwtToken))
                .catch((error: ApiErrorModel) => res.status(error.status).json(error));
        }
    };

    changePassword = async (req: Request, res: Response) => {

        res.send('authorized');
    };
}
