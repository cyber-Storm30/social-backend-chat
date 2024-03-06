import ChatModel from "../models/chat.model.js";
import axios from "axios";
import { BASE_URL } from "../config/connection.js";

class ChatService {
  async createChat(senderId, receiverId) {
    try {
      const chat = await ChatModel.findOne({
        $and: [
          { users: { $elemMatch: { $eq: senderId } } },
          { users: { $elemMatch: { $eq: receiverId } } },
        ],
      });
      if (chat) {
        throw new Error("Chat already exists");
      } else {
        const newChat = new ChatModel({
          users: [senderId, receiverId],
        });
        const savedChat = await newChat.save();
        return savedChat;
      }
    } catch (err) {
      throw err;
    }
  }
  async getAllChats(id) {
    if (!id) {
      throw new Error("Missing parameters");
    }
    try {
      let allChats = await ChatModel.find({
        users: { $in: [id] },
      }).sort({ updatedAt: -1 });

      const populatedChats = await Promise.all(
        allChats.map(async (chat) => {
          const otherUserId = chat.users.find((userId) => userId !== id);
          const userResponse = await axios.get(
            `${BASE_URL}/auth/user/${otherUserId}`
          );
          const populatedUser = userResponse.data.data;

          return {
            ...chat.toObject(),
            users: [populatedUser, id],
          };
        })
      );

      return populatedChats;
    } catch (err) {
      throw err;
    }
  }
}

export default new ChatService();
