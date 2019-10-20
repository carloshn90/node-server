import * as chai from 'chai';
import { request, expect } from 'chai';
import { Response } from 'superagent';
import server from '../../../src/server';

import chaiHttp = require('chai-http');

// Config chai
chai.use(chaiHttp);
chai.should();

describe('Welcome controller integration test', () => {

    describe('GET /', () => {

        it ('should return Welcome!', async() => {

            const res: Response = await request(server).get('/');

            expect(res).to.have.status(200);
            expect(res.text).to.equals('Welcome!');
        });

    });
});
