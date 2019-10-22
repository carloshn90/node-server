import { Request, Response, NextFunction } from 'express';
import { IToken } from '../interfaces/token.interface';
import * as _ from 'lodash';

export const checkRole = (roles: Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        if (_.isEmpty(roles)) {
            next();
            return;
        }

        if (_.isNil(res.locals) || _.isNil(res.locals.jwtPayload)) {
            res.status(401).send();
            return;
        }

//        Get the user ID from previous middleware
        const jwtToken = res.locals.jwtPayload as IToken;
        const jwtRoles: Array<string> = _.isNil(jwtToken.roles) ? [] : jwtToken.roles;

//        Check if array of authorized roles includes the user's role
        if (roles.some(role => jwtRoles.includes(role))) {
            next();
        } else {
            res.status(401).send();
        }

    };
};
