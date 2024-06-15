import mongoose from "mongoose";

const MessagesSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
        main_text_message: { type: String, default: "" },
        message_type: { type: Number },
        response_to: { type: String },
        message_read: { type: Number },
        reactions: { type: String },
        message_effect: { type: Number },
        flag: { type: Number },
        platform: { type: String },
        token: { type: String, unique: true, },
        deleted: { type: Number },
        receivedAt: { type: String },
        readAt: { type: String },
        playedAt: { type: String },
        cc: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const MessagesModel = mongoose.model("messages_yb", MessagesSchema, 'messages');

