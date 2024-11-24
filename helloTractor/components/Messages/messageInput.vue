<template>
  <form class="px-4 my-3" @submit.prevent="handleSubmit">
  <div class="w-full relative"></div>
  <input
    type="text"
    class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
    placeholder="Send a message"
    v-model="message"
  />
  <button type="submit" class="absolute inset-y-0 end-0 flex items-center pe-3"></button>
  <div v-if="loading" class="loading loading-spinner"></div>
  <BsSend v-else />
</button>
		</div >
	</form >
</template >

<script>
import { ref } from 'vue';
import { BsSend } from 'vue-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

export default {
	components: {
		BsSend,
	},
	setup() {
		const message = ref('');
		const { loading, sendMessage } = useSendMessage();

		const handleSubmit = async () => {
			if (!message.value) return;
			await sendMessage(message.value);
			message.value = '';
		};

		return {
			message,
			loading,
			handleSubmit,
		};
	},
};
</script>

<style scoped>
/* Add your styles here */
</style>
