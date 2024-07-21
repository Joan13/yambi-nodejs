import mongoose from "mongoose";

const BusinessSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true },
        business_name: { type: String, required: true },
        slogan: { type: String },
        description_service: { type: String },
        category: { type: Number },
        keywords: { type: String },
        currency: { type: Number },
        logo: { type: String },
        phones: { type: String },
        emails: { type: String },
        background: { type: String },
        national_number: { type: String },
        national_id: { type: String },
        business_active: { type: Number, required: true },
        business_address: { type: String },
        business_visible: { type: Number, required: true },
        website: { type: String },
        other_links: { type: String },
        yambi: { type: String },
        valid_until: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const BusinessModel = mongoose.model("business_yb", BusinessSchema, 'businesses');

