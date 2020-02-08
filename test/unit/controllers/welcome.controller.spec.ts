import { Response, Request} from 'express';
import { expect } from 'chai';
import * as chai from 'chai';
import sinonChai = require('sinon-chai');
import { mockReq, mockRes } from 'sinon-express-mock';
import { WelcomeController } from '../../../src/controllers/welcome.controller';

chai.use(sinonChai);

describe('Welcome controller unit test', () => {

    it ('should return Welcome!', async () => {
        const req: Request = mockReq();
        const res: Response = mockRes();
        const welcomeController: WelcomeController = new WelcomeController();

        await welcomeController.getWelcome(req, res);

        expect(res.send).to.be.calledWith('Welcome!');
    });
});
