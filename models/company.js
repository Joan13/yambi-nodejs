import mongoose from "mongoose";

const CompanySchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true },
        company_names: { type: String, required: true },
        slogan: { type: String },
        description_service: { type: String },
        category: { type: String },
        keywords: { type: String },
        logo: { type: String },
        phones: { type: String },
        emails: { type: String },
        background: { type: String },
        company_active: { type: String },
        company_address: { type: String },
        company_visibility: { type: String },
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

export const CompanyModel = mongoose.model("companies_yb", CompanySchema, 'companies');

