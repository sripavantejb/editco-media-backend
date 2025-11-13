import mongoose, { Document } from 'mongoose';
export interface ILoginHistory {
    timestamp: Date;
    ipAddress?: string;
    userAgent?: string;
}
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    companyName?: string;
    avatar?: string;
    authProvider: 'credentials' | 'google';
    googleId?: string;
    loginHistory: ILoginHistory[];
    createdAt: Date;
    updatedAt: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map