import UserModel, {IUser} from '../models/user.model';

export class UserService {

    findAllUser(): Promise<Array<IUser>> {

        const userPromise: Promise<Array<IUser>> = new Promise((resolve, reject) => {

            UserModel.find({}).exec(function(err, userModelArray) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userModelArray as Array<IUser>);
                }
            });

        });

        return userPromise;
    }
}
