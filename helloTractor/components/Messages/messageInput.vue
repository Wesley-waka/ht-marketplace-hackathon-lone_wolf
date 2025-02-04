<template>
	<form class="px-4 my-3" @submit.prevent="handleSubmit">
		<!-- <div class="w-full relative">
			<input type="text"
				class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
				placeholder="Send a message" v-model="message" />
			<button type="submit" class="absolute inset-y-0 end-0 flex items-center pe-3">
				<div v-if="loading" class="loading loading-spinner"></div>
				<pi-send v-else />
			</button>
		</div> -->

<!--		<div class=" mt-4 border-t  h-[40px] flex flex-row space-x-2">-->
		<InputGroup>
<!--    <CustomInputContainer placeholder="Type a message">-->
				<InputText class="w-full p-4 border-b border-gray-200" />
<!--				<button class="  rounded-md">-->
<!--					<div v-if="loading" class="loading loading-spinner"></div>-->
<!--					&lt;!&ndash; <pi-send v-else /> &ndash;&gt;-->
<!--					<img v-else type="submit" src="/White/HT_ICONS_WHITE_RGB-66.png" alt=""-->
<!--						class=" bg-orangeBright rounded-md h-[43px] w-[63px] border-2 ">-->
<!--				</button>-->
<!--			</CustomInputContainer>-->

      <InputGroupAddon>
        <div v-if="loading" class="loading loading-spinner"></div>
      <Button v-else icon="pi pi-send" severity="secondary" />
      </InputGroupAddon>
    </InputGroup>
			<!-- <InputText placeholder="Type a message" class="w-full p-4 border-b border-gray-200" /> -->

<!--		</div>-->
		<!-- <button class="  rounded-md">
			<div v-if="loading" class="loading loading-spinner"></div>
			<img v-else type="submit" src="/White/HT_ICONS_WHITE_RGB-66.png" alt=""
				class=" bg-orangeBright rounded-md h-[43px] w-[63px] border-2 ">
		</button> -->
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