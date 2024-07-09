import mongoose from "mongoose";

const BusinessItemsSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        business_id:  { type: String, required: true },
        phone_number:  { type: String, required: true },
        item_name:  { type: String, required: true },
        slogan: { type: String },
        item_type:  { type: Number, required: true },
        wholesale_content_number: { type: Number },
        items_number_stock: { type: Number },
        items_number_warehouse: { type: Number },
        description_item: { type: String },
        keywords: { type: String },
        images: { type: String },
        background: { type: String },
        item_active: { type: Number },
        uploaded: { type: Number },
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const BusinessItemsModel = mongoose.model("items_yb", BusinessItemsSchema, 'business_items');

