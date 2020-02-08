import {IUser} from '../models/user.model';
import {LOGGER} from '../config/logger.config';
import {JwtService} from './jwt.service';
import {UserDao} from '../daos/user.dao';
import * as _ from 'lodash';
import {ApiErrorModel} from '../models/api.error.model';

export class UserService {

    logger = LOGGER.child({ class: 'UserService' });

    jwtService: JwtService;
    userDao: UserDao;

    constructor() {
        this.jwtService = new JwtService();
        this.userDao = new UserDao();
    }

    async login(email: string, passwordHash: string): Promise<string> {

        const userModel: IUser = await this.userDao.findUserByEmail(email, passwordHash);

        if (_.isNil(userModel)) {
            this.logger.error('The user is not registered');
            throw new ApiErrorModel(403, 'Forbidden: The user is not registered');
        }

        return this.jwtService.createJwt('1234', userModel.firstName, userModel.roles);
    }

    async findAll(): Promise<Array<IUser>> {
        return this.userDao.findAll();
    }
}
