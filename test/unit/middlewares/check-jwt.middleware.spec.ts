import {Response, Request, NextFunction} from 'express';
import { expect } from 'chai';
import * as chai from 'chai';
import sinon = require('sinon');
import sinonChai = require('sinon-chai');
import {mockReq, mockRes} from 'sinon-express-mock';
import {checkJwt} from '../../../src/middlewares/check-jwt.middleware';
import * as jwt from 'jsonwebtoken';
import config from '../../../src/config/config';

chai.use(sinonChai);

describe('check jwt middleware unit test', () => {

    it ('Header undefined should return forbidden 401', async() => {

        const req: Request = mockReq();
        const res: Response = mockRes();
        const next: NextFunction = async () => {};

        checkJwt(req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Undefined auth should return forbidden 401', async() => {

        const request = {headers: {}};

        const req: Request = mockReq(request);
        const res: Response = mockRes();
        const next: NextFunction = async () => {};

        checkJwt(req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Empty auth should return forbidden 401', async() => {

        const request = {headers: { 'auth': '' }};

        const req: Request = mockReq(request);
        const res: Response = mockRes();
        const next: NextFunction = async () => {};

        checkJwt(req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Wrong auth sign should return forbidden 401', async() => {

        const request = {headers:
                { 'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                        'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
                        'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                }
        };

        const req: Request = mockReq(request);
        const res: Response = mockRes();
        const next: NextFunction = async () => {};

        checkJwt(req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Expired auth token should return forbidden 401', async() => {

        const request = {headers:
                { 'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                        'eyJ1c2VySWQiOiIxMjM0IiwidXNlcm5hbWUiOiJjYXJsb3MiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE1NzE1NjY0NTUsImV4cCI6MTU3MTU2NjUxNX0.' +
                        '3DaPG20ImHzab1O-BigL6HunRlJqzYm9W5X6bPciLtI'
                }
        };

        const req: Request = mockReq(request);
        const res: Response = mockRes();
        const next: NextFunction = async () => {};

        checkJwt(req, res, next);

        expect(res.status).to.be.calledWith(401);
    });

    it ('Correct auth token should return ok 200', async() => {

//       Sing JWT, valid for 1 hour
        const jwtToken: string = jwt.sign(
            {userId: '1234', username: 'carlos', roles: ['ADMIN']},
            config.jwtSecret,
            { expiresIn: '1h'}
        );

        const request = {headers: { 'auth': jwtToken}};
        const response = {setHeader: sinon.stub().returns({})};

        const req: Request = mockReq(request);
        const res: Response = mockRes(response);
        const next: NextFunction = async () => {};

        checkJwt(req, res, next);

        expect(res.status).to.not.be.calledWith(401);
    });
});
