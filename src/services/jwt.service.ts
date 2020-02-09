import * as jwt from 'jsonwebtoken';
import config from '../configs/config';

export class JwtService {

    createJwt(userId: string, username: string, roles: Array<string>): string {

        return jwt.sign(
            {userId: userId, username: username, roles: roles},
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
