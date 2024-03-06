import express from "express";
import ChatController from "../controllers/chat.controller.js";
const router = express.Router();

router.post("/", ChatController.createChat);
router.get("/:id", ChatController.getAllChats);

export default router;
