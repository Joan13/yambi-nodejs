import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true, unique: true },
        user_names: { type: String, required: true },
        gender: { type: Number, required: true },
        birth_date: { type: String },
        country: { type: String, required: true },
        user_profile: { type: String },
        user_email: { type: String },
        user_address: { type: String },
        bio: { type: String },
        profession: { type: String },
        status_information: { type: String },
        user_password: { type: String },
        notification_token: { type: String },
        account_privacy: { type: Number },
        account_valid: { type: Number },
        cc: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const UsersModel = mongoose.model("users_yb", UsersSchema, 'users_center');

