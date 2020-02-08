import { UserService } from '../../../src/services/user.service';
import { UserDao } from '../../../src/daos/user.dao';
import sinon  from 'sinon';
import { expect } from 'chai';
import * as chai from 'chai';
import { ApiErrorModel } from '../../../src/models/api.error.model';
import chaiAsPromised  from 'chai-as-promised';

let userService: UserService;
beforeEach(async () => {
    userService = new UserService();
    chai.use(chaiAsPromised);
});

describe('UserService unit test', () => {

    it('FindUser undefined should be return rejected', async () => {

        const email: string = 'test@test.com';
        const password: string = 'AS34AS';

        const findUserByEmailStub = sinon.stub(UserDao.prototype, 'findUserByEmail');
        findUserByEmailStub.withArgs(email, password).returns(new Promise((resolve) => resolve(undefined)));

        expect(userService.login(email, password)).to.be.rejectedWith(new ApiErrorModel(403, 'Forbidden: The user is not registered'));
    });
});
