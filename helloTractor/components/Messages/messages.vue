<template>
	<div class="px-4 flex-1 overflow-auto">
		<div v-if="!loading && messages.length > 0">
			<div v-for="message in messages" :key="message._id" ref="lastMessageRef"></div>
				<Message :message="message" />
			</div>
		</div>
		<div v-if="loading">
			<MessageSkeleton v-for="idx in 3" :key="idx" />
		</div>
		<p v-if="!loading && messages.length === 0" class="text-center">
			Send a message to start the conversation
		</p>
	</div>
</template>

<script></script>
import { ref, onMounted, watch } from 'vue';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton.vue';
import Message from './Message.vue';
import useListenMessages from '../../hooks/useListenMessages';

export default {
	components: {
		MessageSkeleton,
		Message,
	},
	setup() {
		const { messages, loading } = useGetMessages();
		useListenMessages();
		const lastMessageRef = ref(null);

		onMounted(() => {
			setTimeout(() => {
				lastMessageRef.value?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		});

		watch(messages, () => {
			setTimeout(() => {
				lastMessageRef.value?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		});

		return {
			messages,
			loading,
			lastMessageRef,
		};
	},
};
</script>

<style scoped>
/* Add your styles here */
</style>
