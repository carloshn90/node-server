
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {

    static login = async (req: Request, res: Response) => {

//       Sing JWT, valid for 1 hour
        const jwtToken: string = jwt.sign(
            {userId: '1234', username: 'carlos', roles: ['ADMIN']},
            config.jwtSecret,
            { expiresIn: '1h'}
        );
        res.send(jwtToken);
    };

    static changePassword = async (req: Request, res: Response) => {

        res.send('authorized');
    };
}

export default AuthController;
