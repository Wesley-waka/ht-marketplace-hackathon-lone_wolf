<template>
	<div class="md:min-w-[450px] flex flex-col"></div>
		<div v-if="!selectedConversation"></div>
			<NoChatSelected />
		</div>
		<div v-else></div>
			<!-- Header -->
			<div class="bg-slate-500 px-4 py-2 mb-2"></div>
				<span class="label-text">To:</span>
				<span class="text-gray-900 font-bold">{{ selectedConversation.fullName }}</span>
			</div>
			<Messages />
			<MessageInput />
		</div>
	</div>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import useConversation from '../../zustand/useConversation';
import MessageInput from './MessageInput.vue';
import Messages from './Messages.vue';
import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext';

export default {
	components: {
		MessageInput,
		Messages,
		TiMessages,
		NoChatSelected
	},
	setup() {
		const { selectedConversation, setSelectedConversation } = useConversation();

		onUnmounted(() => {
			setSelectedConversation(null);
		});

		return {
			selectedConversation,
			setSelectedConversation
		};
	}
};

const NoChatSelected = {
	template: `
		<div class="flex items-center justify-center w-full h-full">
			<div class="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>Welcome 👋 {{ authUser.fullName }} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages class="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	`,
	setup() {
		const { authUser } = useAuthContext();
		return {
			authUser
		};
	}
};
</script>

<style scoped>
/* Add your styles here */
</style>
