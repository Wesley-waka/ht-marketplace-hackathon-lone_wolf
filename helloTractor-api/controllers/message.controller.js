import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import User from "../models/User.js";


export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// get all users
// export const getUsersForSidebar = async (req, res) => {
// 	try {
// 		const loggedInUserId = req.user._id;

// 		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

// 		res.status(200).json(filteredUsers);
// 	} catch (error) {
// 		console.error("Error in getUsersForSidebar: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };


//get the loggged in userId then push it to the array of matchedUsers of the user that is being matched and also push the matched user to the array of matchedUsers of the logged in user
export const getMatchedUser = async (req, res) => {
	try {
		const { id: matchedUserId } = req.params;
		const loggedInUserId = req.user._id;

		const matchedUser = await User.findById(matchedUserId);
		const loggedInUser = await User.findById(loggedInUserId);

		if (!matchedUser || !loggedInUser) {
			return res.status(404).json({ error: "User not found" });
		}

		if (matchedUser.matchedUsers.includes(loggedInUserId) || loggedInUser.matchedUsers.includes(matchedUserId)) {
			return res.status(400).json({ error: "User already matched" });
		}

		matchedUser.matchedUsers.push(loggedInUserId);
		loggedInUser.matchedUsers.push(matchedUserId);

		await Promise.all([matchedUser.save(), loggedInUser.save()]);
		res.status(200).json({ message: "User matched successfully" });
	} catch (error) {
		console.error("Error in matchUser: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


//get all  users matched
export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ matchedUsers: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
