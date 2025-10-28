import express from "express"
import { protectRoutes } from "../middleware/auth.js";
import { getMessages, getUsersForSidebar, markMassageAsSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoutes, getUsersForSidebar)
messageRouter.get("/:id", protectRoutes, getMessages)
messageRouter.put("/mark/:id", protectRoutes, markMassageAsSeen)
messageRouter.post("/send/:id", protectRoutes, sendMessage)

export default messageRouter;
