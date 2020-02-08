import {Document, Schema} from 'mongoose';
import * as mongoose from 'mongoose';

export interface IUser extends Document{
    _id: mongoose.Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: Array<string>;
}

const UserSchema: Schema = new Schema({
    _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }]
});

export default mongoose.model('User', UserSchema);
