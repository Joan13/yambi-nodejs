import mongoose from "mongoose";

const ItemPricesSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        item_id: { type: String },
        phone_number: { type: String },
        wholesale_cost_price: { type: String },
        wholesale_selling_price: { type: String },
        retail_selling_price: { type: String },
        // uploaded: { type: Number },
        currency: { type: Number }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const ItemPricesModel = mongoose.model("item_prices_yb", ItemPricesSchema, 'item_prices');

