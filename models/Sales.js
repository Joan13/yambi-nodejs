import mongoose from "mongoose";

const SalesSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        item_id: { type: String },
        business_id: { type: String },
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
        type_sale: { type: Number },
        sale_active: { type: Number },
        currency: { type: Number },
        delivery_time: { type: String },
        country: { type: String },
        description: {type: String},
        buyer_name: { type: String },
        buyer_phone: { type: String },
        createdAt: { type: String },
        updatedAt: { type: String }
    },
    {
        // timestamps: true,
        primaryKey: '_id'
    }
)

export const SalesModel = mongoose.model("sales_yb", SalesSchema, 'sales');

