import mongoose from "mongoose";

const SellsPointSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true },
        business_id: { type: String, required: true },
        sells_point_name: { type: String, required: true },
        slogan: { type: String },
        description_service: { type: String },
        category: { type: Number },
        keywords: { type: String },
        logo: { type: String },
        phones: { type: String },
        emails: { type: String },
        background: { type: String },
        country: { type: String },
        sells_point_active: { type: Number, required: true },
        sells_point_address: { type: String },
        sells_point_visible: { type: Number, required: true },
        website: { type: String },
        other_links: { type: String },
        yambi: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const SellsPointModel = mongoose.model("sells_points_yb", SellsPointSchema, 'sells_points');

