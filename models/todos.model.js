import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Todo must have a user!"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Todos = mongoose.model("Todo", todoSchema);
export default Todos;
