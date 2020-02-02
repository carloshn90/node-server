import {LOGGER} from '../config/logger.config';
import UserModel, {IUser} from '../models/user.model';
import {ApiErrorModel} from '../models/api.error.model';

export class UserDao {

    logger = LOGGER.child({ class: 'UserDao' });

    findAll(): Promise<Array<IUser>> {

        const userPromise: Promise<Array<IUser>> = UserModel
            .find({}).exec().then((userModelArray) => {
                return userModelArray as Array<IUser>;
            }, (error) => {
                this.logger.error(error);
                throw new ApiErrorModel(500, 'Database error check log for more information');
            });

        return userPromise;
    }

    findUserByEmail(email: string, passwordHash: string): Promise<IUser> {

        const userPromise: Promise<IUser> = UserModel
            .findOne({email: email, password: passwordHash}).exec().then((userModel) => {
                return userModel as IUser;
            }, (error: Error) => {
                this.logger.error(error);
                throw new ApiErrorModel(500, 'Database error check log for more information');
            });

        return userPromise;
    }
}
