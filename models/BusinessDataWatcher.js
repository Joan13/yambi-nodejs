import mongoose from "mongoose";

const BusinessDataWatcherSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        business_id: { type: String },
        sales_point_id: { type: String },
        user: { type: String },
        phone_number: { type: String },
        item_id: { type: String },
        item_price_id: { type: String },
        sale_id: { type: String },
        expense_id: { type: String },
        loan_id: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const BusinessDataWatcherModel = mongoose.model("business_data_watcher_yb", BusinessDataWatcherSchema, 'business_data_watcher');

