import { UserService } from '../../../src/services/user.service';
import { UserRepository } from '../../../src/repositories/user.repository';
import sinon from 'sinon';
import { expect } from 'chai';
import * as chai from 'chai';
import { ApiErrorModel } from '../../../src/models/api.error.model';
import chaiAsPromised  from 'chai-as-promised';
import { IUser } from '../../../src/interfaces/user.interface';
import { JwtService } from '../../../src/services/jwt.service';
import mongoose = require('mongoose');

let userService: UserService;
beforeEach(() => {
    userService = new UserService();
    chai.use(chaiAsPromised);
});

afterEach(() => {
    sinon.restore();
});

describe('UserService unit test', () => {

    it('FindUser undefined should be return rejected', async () => {

        const email = 'test@test.com';
        const password = 'AS34AS';

        const findUserByEmailStub = sinon.stub(UserRepository.prototype, 'findUserByEmail');
        findUserByEmailStub.withArgs(email, password).returns(new Promise((resolve) => resolve(undefined)));

        expect(userService.login(email, password)).to.be.rejectedWith(new ApiErrorModel(403, 'Forbidden: The user is not registered'));
    });

    it('Should be create a Jwt token', async () => {

        const jwtKey = 'ASJDDD';
        const email = 'test@test.com';
        const password = 'AS34AS';
        const firstName = 'test name';
        const roleArray: Array<string> = ['TEST'];
        const id: mongoose.Types.ObjectId = mongoose.Types.ObjectId('5d6ede6a0ba62570afcedd3a');
        const userMock: IUser = {_id: id, firstName: firstName, lastName: '', email: '', password: '', roles: roleArray};

        const findUserByEmailStub = sinon.stub(UserRepository.prototype, 'findUserByEmail');
        findUserByEmailStub.withArgs(email, password).returns(new Promise((resolve) => resolve(userMock)));

        const createJwtStub = sinon.stub(JwtService.prototype, 'createJwt');
        createJwtStub.withArgs(id.toHexString(), firstName, roleArray).returns(jwtKey);

        expect(await userService.login(email, password)).to.be.equal(jwtKey);
    });
});
