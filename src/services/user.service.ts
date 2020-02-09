import { IUser } from '../interfaces/user.interface';
import { LOGGER } from '../configs/logger.config';
import { JwtService } from './jwt.service';
import { UserRepository } from '../repositories/user.repository';
import * as _ from 'lodash';
import { ApiErrorModel } from '../models/api.error.model';

export class UserService {

    logger = LOGGER.child({ class: 'UserService' });

    jwtService: JwtService;
    userDao: UserRepository;

    constructor() {
        this.jwtService = new JwtService();
        this.userDao = new UserRepository();
    }

    async login(email: string, passwordHash: string): Promise<string> {

        const userModel: IUser = await this.userDao.findUserByEmail(email, passwordHash);

        if (_.isNil(userModel)) {
            this.logger.error('The user is not registered');
            throw new ApiErrorModel(403, 'Forbidden: The user is not registered');
        }

        return this.jwtService.createJwt(userModel._id.toHexString(), userModel.firstName, userModel.roles);
    }

    async findAll(): Promise<Array<IUser>> {
        return this.userDao.findAll();
    }
}
