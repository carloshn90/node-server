import { LOGGER } from '../configs/logger.config';
import UserModel from '../models/user.model';
import { ApiErrorModel } from '../models/api.error.model';
import { IUser } from '../interfaces/user.interface';

export class UserRepository {

    logger = LOGGER.child({ class: 'UserDao' });

    findAll(): Promise<Array<IUser>> {

        const userPromise: Promise<Array<IUser>> = UserModel
            .find({}).lean().exec().then((userModelArray) => {
                return userModelArray as Array<IUser>;
            }, (error) => {
                this.logger.error(error);
                throw new ApiErrorModel(500, 'Database error check log for more information');
            });

        return userPromise;
    }

    findUserByEmail(email: string, passwordHash: string): Promise<IUser> {

        const userPromise: Promise<IUser> = UserModel
            .findOne({email: email, password: passwordHash}).lean().exec().then((userModel) => {
                return userModel as IUser;
            }, (error: Error) => {
                this.logger.error(error);
                throw new ApiErrorModel(500, 'Database error check log for more information');
            });

        return userPromise;
    }
}
