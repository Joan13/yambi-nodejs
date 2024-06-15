import mongoose from "mongoose";

const BusinessSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true },
        business_name: { type: String, required: true },
        slogan: { type: String },
        description_service: { type: String },
        category: { type: String },
        keywords: { type: String },
        logo: { type: String },
        phones: { type: String },
        emails: { type: String },
        background: { type: String },
        business_active: { type: String },
        business_address: { type: String },
        business_visibility: { type: String },
        website: { type: String },
        other_links: { type: String },
        yambi: { type: String },
        createdAt: { type: String },
        updatedAt: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const BusinessModel = mongoose.model("businesses_yb", BusinessSchema, 'businesses');

