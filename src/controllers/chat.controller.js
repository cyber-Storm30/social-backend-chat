import ChatService from "../services/chat.service.js";

class ChatController {
  async createChat(req, res) {
    try {
      const data = await ChatService.createChat(
        req.body.senderId,
        req.body.receiverId
      );
      res.status(200).json({
        success: true,
        message: "Chat created succesfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getAllChats(req, res) {
    try {
      const data = await ChatService.getAllChats(req.params.id);
      res.status(200).json({
        success: true,
        message: "Chats fetched succesfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ChatController();
