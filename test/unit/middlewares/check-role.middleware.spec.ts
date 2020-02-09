import {Response, Request, NextFunction} from 'express';
import { expect } from 'chai';
import * as chai from 'chai';
import sinonChai = require('sinon-chai');
import { mockReq, mockRes } from 'sinon-express-mock';
import { checkRole } from '../../../src/middlewares/check-role.middleware';

chai.use(sinonChai);

describe('check jwt middleware unit test', () => {

    it ('jwtPayload undefined should return forbidden 401', async() => {

        const req: Request = mockReq();
        const res: Response = mockRes();
        const next: NextFunction = async () => {};
        const checkRoleFunction: Function = checkRole(['ADMIN']) as Function;

        await checkRoleFunction.call(checkRoleFunction, req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Empty jwtPayload roles return forbidden 401', async() => {

        const jwtToken = {roles: ['SELLER']};
        const response = {
            locals: {
                jwtPayload: jwtToken
            }
        };

        const req: Request = mockReq();
        const res: Response = mockRes(response);
        const next: NextFunction = async () => {};
        const checkRoleFunction: Function = checkRole(['ADMIN']) as Function;

        await checkRoleFunction.call(checkRoleFunction, req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('JwtPayload with different role should return forbidden 401', async() => {

        const jwtToken = {roles: ['SELLER']};
        const response = {
            locals: {
                jwtPayload: jwtToken
            }
        };

        const req: Request = mockReq();
        const res: Response = mockRes(response);
        const next: NextFunction = async () => {};
        const checkRoleFunction: Function = checkRole(['ADMIN']) as Function;

        await checkRoleFunction.call(checkRoleFunction, req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Empty role should next', async() => {

        const jwtToken = {roles: ['SELLER']};
        const response = {
            locals: {
                jwtPayload: jwtToken
            }
        };

        const req: Request = mockReq();
        const res: Response = mockRes(response);
        const next: NextFunction = async () => {};
        const checkRoleFunction: Function = checkRole([]) as Function;

        await checkRoleFunction.call(checkRoleFunction, req, res, next);

        expect(res.status).to.not.be.calledWith(401);
    });

    it ('Role Exist in array return next', async() => {

        const jwtToken = {roles: ['SELLER']};
        const response = {
            locals: {
                jwtPayload: jwtToken
            }
        };

        const req: Request = mockReq();
        const res: Response = mockRes(response);
        const next: NextFunction = async () => {};
        const checkRoleFunction: Function = checkRole(['ADMIN', 'SELLER']) as Function;

        await checkRoleFunction.call(checkRoleFunction, req, res, next);

        expect(res.status).to.not.be.calledWith(401);
    });
});
