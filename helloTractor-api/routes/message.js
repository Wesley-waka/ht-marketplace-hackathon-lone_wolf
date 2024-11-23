import express from "express";
import { getMatchedUser, getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const messageRouter = express.Router();

messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.get("/", protectRoute, getUsersForSidebar);
messageRouter.get('/match-user/:id',protectRoute,getMatchedUser)
// messageRouter.get("/", protectRoute, getUsersForSidebar); - get users depending on the ones you have chatted with

// const attachUser = (req, res, next) => {
//   req.user = { _id: '673bf0890372797bcf82e2b7' }; // Attach the user object
//   next();
// };

// messageRouter.get("/:id",  attachUser, getMessages);
// messageRouter.post("/send/:id",  attachUser, sendMessage);

export default messageRouter;