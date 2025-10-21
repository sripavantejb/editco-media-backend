import mongoose, { Schema, Document } from 'mongoose';

// Interface for Login History
export interface ILoginHistory {
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Interface for User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  companyName?: string;
  loginHistory: ILoginHistory[];
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    companyName: {
      type: String,
      trim: true
    },
    loginHistory: [{
      timestamp: {
        type: Date,
        default: Date.now
      },
      ipAddress: {
        type: String
      },
      userAgent: {
        type: String
      }
    }]
  },
  {
    timestamps: true
  }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;

