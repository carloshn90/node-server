import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export interface IUserDocument extends IUser, Document{
    _id: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }]
});

export default mongoose.model('User', UserSchema);
