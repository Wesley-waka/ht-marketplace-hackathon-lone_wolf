<template>
	<form class="px-4 my-3" @submit.prevent="handleSubmit">
	  <div class="w-full relative">
		<input
		  type="text"
		  class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
		  placeholder="Send a message"
		  v-model="message"
		/>
		<button type="submit" class="absolute inset-y-0 end-0 flex items-center pe-3">
		  <div v-if="loading" class="loading loading-spinner"></div>
		  <pi-send v-else />
		</button>
	  </div>
	</form>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const message = ref('');
  const { loading, sendMessage } = useSendMessage();
  
  const handleSubmit = async () => {
	if (!message.value) return;
	await sendMessage(message.value);
	message.value = '';
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>