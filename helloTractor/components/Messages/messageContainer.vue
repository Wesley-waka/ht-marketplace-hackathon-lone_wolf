<template>
    <div class="md:min-w-[450px] flex flex-col">
        <div v-if="!selectedConversation">
            <NoChatSelected />
        </div>
        <div v-else>
            <!-- Header -->
            <div class="bg-slate-500 px-4 py-2 mb-2">
                <span class="label-text">To:</span>
                <span class="text-gray-900 font-bold">{{ selectedConversation.fullName }}</span>
            </div>
            <MessagesMessage />
            <MessagesMessageInput />
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { TiMessages } from 'react-icons/ti';
import { useConversationStore } from '~/stores/useConversationStore';
import { useAuthStore } from '~/stores/useAuthStore';

// Define NoChatSelected as a separate component
const NoChatSelected = {
    name: 'NoChatSelected',
    components: {
        TiMessages
    },
    setup() {
        const { authUser } = useAuthStore();
        return {
            authUser
        };
    },
    template: `
        <div class="flex items-center justify-center w-full h-full">
            <div class="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {{ authUser.fullName }} ❄</p>
                <p>Select a chat to start messaging</p>
               <img src="/public/Black/HT_ICONS_BLACK_RGB-66.png" alt='messages empty'/>
            </div>
        </div>
    `
};

const { selectedConversation, setSelectedConversation } = useConversationStore();

onUnmounted(() => {
    setSelectedConversation(null);
});

</script>

<style scoped>
/* Add your styles here */
</style>