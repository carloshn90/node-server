import * as mongoose from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: Array<string>;
}
