import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: String,
        default: null,
      },
    ],
    latestMessage: {
      type: String,
      default: "",
    },
    isGroupChat: { type: Boolean, default: false },
    groupAdmin: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);
