import mongoose from "mongoose";

const BusinessItemsSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true },
        business_id: { type: String, required: true },
        item_name: { type: String, required: true },
        item_type: { type: Number, required: true },
        slogan: { type: String },
        wholesale_cost_price: { type: String, required: true },
        wholesale_selling_price: { type: String },
        retail_selling_price: { type: String },
        wholesale_items_number: { type: Number },
        item_number: { type: number },
        description_item: { type: String },
        keywords: { type: String },
        images: { type: String },
        background: { type: String },
        item_active: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const BusinessItemsModel = mongoose.model("items_yb", BusinessItemsSchema, 'business_items');

