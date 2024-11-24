<template>
	<div :class="`chat ${chatClassName}`">
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img :alt="altText" :src="profilePic" />
			</div>
		</div>
		<div :class="`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`">{{ message.message }}</div>
		<div class="chat-footer opacity-50 text-xs flex gap-1 items-center">{{ formattedTime }}</div>
	</div>
</template>

<script>
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

export default {
	props: {
		message: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const { authUser } = useAuthContext();
		const { selectedConversation } = useConversation();
		const fromMe = props.message.senderId === authUser._id;
		const formattedTime = extractTime(props.message.createdAt);
		const chatClassName = fromMe ? "chat-end" : "chat-start";
		const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
		const bubbleBgColor = fromMe ? "bg-blue-500" : "";
		const shakeClass = props.message.shouldShake ? "shake" : "";
		const altText = "Tailwind CSS chat bubble component";

		return {
			authUser,
			selectedConversation,
			fromMe,
			formattedTime,
			chatClassName,
			profilePic,
			bubbleBgColor,
			shakeClass,
			altText
		};
	}
};
</script>

<style scoped>
/* Add your styles here */
</style>
