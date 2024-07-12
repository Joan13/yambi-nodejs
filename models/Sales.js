import mongoose from "mongoose";

const SalesSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        item_id: { type: String },
        sales_point_id: { type: String },
        sale_operator: { type: String },
        number: { type: Number },
        cost_price: { type: String },
        selling_price: { type: String },
        delivery_price: { type: String },
        delivery_address: { type: String },
        delivery_price: { type: String },
        delivery_address: { type: String },
        delivery_time: { type: String },
        discount_price: { type: String },
        // uploaded: { type: Number },
        sale_active: { type: Number },
        delivery_time: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const SalesModel = mongoose.model("sales_yb", SalesSchema, 'sales');

