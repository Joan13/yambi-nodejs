import mongoose from "mongoose";

const BusinessUsersSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        business_id: { type: String },
        sales_point_id: { type: String },
        phone_number: { type: String },
        level: { type: Number },
        user_active: { type: Number }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const BusinessUsersModel = mongoose.model("business_users_yb", BusinessUsersSchema, 'business_users');

