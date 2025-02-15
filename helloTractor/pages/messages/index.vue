<template>
    <Navbar />
    <div class="bg-slate-100 py-10 h-max">
        <div class="max-w-[72rem] px-6 mx-auto grid grid-cols-4 gap-4 ">





<!--          Display all the connected users-->
            <div class="col-span-1 bg-white rounded-md " style="height: 760px;">

                <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                    <h2>Messages</h2>

                </div>

              <div>
                <div
                    v-for="user in conversations"
                    :key="user._id"
                    class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer"
                    @click="handleMessageDisplay(user)"
                >
                  <div class="relative" @click="handleMessageDisplay(user)">
                    <img
                        :src="user.images[0] || '/public/Black/HT_ICONS_BLACK_RGB-36.png'"
                        class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                        alt="User Avatar"
                    />
                    <div
                        :class="[
              'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
              user.isVerified ? 'bg-green-400' : 'bg-gray-400'
            ]"
                    >
                    </div>
                  </div>

                  <div class="flex flex-col ml-4 flex-grow">
                    <div class="flex items-center justify-between">
                      <div>
                        <h2 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                          {{ user.name }}
                        </h2>
                        <div class="flex items-center mt-0.5 space-x-10">
                <span class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  {{ user.user.replace(/"/g, '') }}
                </span>
                          <span class="text-xs text-gray-500 ml-3">
                  {{ formatTimeAgo(user.createdAt) }}
                </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



                <div>
                    <div onclick="handleMessageDisplay(id)" class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer">
                        <!-- Avatar section with improved styling -->
                        <div class="relative">
                            <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png"
                                class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                                alt="User Avatar">
                            <div
                                class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                            </div>
                        </div>

                        <!-- User info section with better spacing and typography -->
                        <div class="flex flex-col ml-4 flex-grow ">
                            <div class="flex items-center justify-between ">
                                <div>
                                    <h2
                                        class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                                        JohnDeere6R
                                    </h2>
                                    <div class="flex items-center mt-0.5 space-x-10">
                                        <span
                                            class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                            Buyer
                                        </span>
                                        <span class="text-xs text-gray-500 ml-3">
                                            2 weeks ago
                                        </span>
                                    </div>
                                </div>

                                <!-- Message icon with hover effect -->
                                <!-- <button class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                                    <img src="/public/Black/HT_ICONS_BLACK_RGB-71.png"
                                        class="w-6 h-6 opacity-75 hover:opacity-100 transition-opacity duration-200"
                                        alt="Message Icon">
                                </button> -->
                            </div>
                        </div>
                    </div>

                  <div class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
                    <!-- Avatar section with improved styling -->
                    <div class="relative">
                      <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png"
                           class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                           alt="User Avatar">
                      <div
                          class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                      </div>
                    </div>

                    <!-- User info section with better spacing and typography -->
                    <div class="flex flex-col ml-4 flex-grow">
                      <div class="flex items-center justify-between">
                        <div>
                          <h2
                              class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                            JohnDeere6R
                          </h2>
                          <div class="flex items-center mt-0.5 space-x-10">
                                        <span
                                            class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                            Buyer
                                        </span>
                            <span class="text-xs text-gray-500 ml-3">
                                            2 weeks ago
                                        </span>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
<!--                    <MessagesConversation />-->
                </div>
            </div>






          <!--Current conversation-->
            <div class="col-span-3 bg-white rounded-md">
              <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">

                <div class="flex items-center ">

                  <div class="w-[50px] relative">
                    <img :src="userSelected.images ?? '' "
                         class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                         alt="User Avatar">
                    <div
                        class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                    </div>
                  </div>

<!--                  {{userSelected}}-->
                  <h6>{{ userSelected.name }}</h6>

                </div>




              </div>

              <div class="grids grid-rows-4 h-[600px]">
                <ul  class="space-y-5 px-8 overflow-y-auto row-span-3 h-full">


                  <div v-for="message in messages" :key="message._id">
                    <!-- Sent messages (by current user) -->
                    <li v-if="message.senderId === user._id" class="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                      <div class="grow text-end space-y-3">
                        <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                          <p class="text-sm text-white">
                            {{ message.message }}
                          </p>
                          <small class="text-xs text-gray-200">
                            {{ new Date(message.createdAt).toLocaleTimeString() }}
                          </small>
                        </div>
                      </div>
                    </li>

                    <!-- Received messages -->
                    <li v-else class="max-w-lg flex gap-x-2 sm:gap-x-4">
                      <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                        <p class="text-sm text-gray-800">
                          {{ message.message }}
                        </p>
                        <small class="text-xs text-gray-500">
                          {{ new Date(message.createdAt).toLocaleTimeString() }}
                        </small>
                      </div>
                    </li>
                  </div>





              <!-- Chat -->

              </ul>

                <div class="row-span-1 h-1/4">
                <MessagesMessageInput @handleGetMessages="getMessages" :id="userSelected._id"/>
                </div>
              </div>
<!--                <MessagesMessageContainer />-->
            </div>

<!--{{conversations}}-->
<!--{{messages.map((mesage)=>mesage)}}-->
<!--          {{user}}-->
<!--          {{-->
<!--            conversations.map(()=>{-->
<!--          <div class="col-span-1 bg-white rounded-md " style="height: 760px;">-->

<!--            <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">-->
<!--              <h2>Messages</h2>-->

<!--            </div>-->
<!--            <div>-->
<!--              <div onclick="handleMessageDisplay(id)" class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer">-->
<!--                &lt;!&ndash; Avatar section with improved styling &ndash;&gt;-->
<!--                <div class="relative">-->
<!--                  <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png"-->
<!--                       class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"-->
<!--                       alt="User Avatar">-->
<!--                  <div-->
<!--                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">-->
<!--                  </div>-->
<!--                </div>-->

<!--                &lt;!&ndash; User info section with better spacing and typography &ndash;&gt;-->
<!--                <div class="flex flex-col ml-4 flex-grow ">-->
<!--                  <div class="flex items-center justify-between ">-->
<!--                    <div>-->
<!--                      <h2-->
<!--                          class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">-->
<!--                        JohnDeere6R-->
<!--                      </h2>-->
<!--                      <div class="flex items-center mt-0.5 space-x-10">-->
<!--                                        <span-->
<!--                                            class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">-->
<!--                                            Buyer-->
<!--                                        </span>-->
<!--                        <span class="text-xs text-gray-500 ml-3">-->
<!--                                            2 weeks ago-->
<!--                                        </span>-->
<!--                      </div>-->
<!--                    </div>-->

<!--                    &lt;!&ndash; Message icon with hover effect &ndash;&gt;-->
<!--                    &lt;!&ndash; <button class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">-->
<!--                        <img src="/public/Black/HT_ICONS_BLACK_RGB-71.png"-->
<!--                            class="w-6 h-6 opacity-75 hover:opacity-100 transition-opacity duration-200"-->
<!--                            alt="Message Icon">-->
<!--                    </button> &ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg">-->
<!--                &lt;!&ndash; Avatar section with improved styling &ndash;&gt;-->
<!--                <div class="relative">-->
<!--                  <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png"-->
<!--                       class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"-->
<!--                       alt="User Avatar">-->
<!--                  <div-->
<!--                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">-->
<!--                  </div>-->
<!--                </div>-->

<!--                &lt;!&ndash; User info section with better spacing and typography &ndash;&gt;-->
<!--                <div class="flex flex-col ml-4 flex-grow">-->
<!--                  <div class="flex items-center justify-between">-->
<!--                    <div>-->
<!--                      <h2-->
<!--                          class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">-->
<!--                        JohnDeere6R-->
<!--                      </h2>-->
<!--                      <div class="flex items-center mt-0.5 space-x-10">-->
<!--                                        <span-->
<!--                                            class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">-->
<!--                                            Buyer-->
<!--                                        </span>-->
<!--                        <span class="text-xs text-gray-500 ml-3">-->
<!--                                            2 weeks ago-->
<!--                                        </span>-->
<!--                      </div>-->
<!--                    </div>-->


<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash;                    <MessagesConversation />&ndash;&gt;-->
<!--            </div>-->
<!--          </div> -->
<!--            })-->
<!--          }}-->

<!--          <div class="col-span-3 bg-white rounded-md">-->
<!--            <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">-->

<!--              <div class="flex items-center ">-->

<!--                <div class="w-[50px] relative">-->
<!--                  <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png"-->
<!--                       class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"-->
<!--                       alt="User Avatar">-->
<!--                  <div-->
<!--                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">-->
<!--                  </div>-->
<!--                </div>-->

<!--                <h6>{{user.name}}</h6>-->

<!--              </div>-->




<!--            </div>-->

<!--            <div class="grids grid-rows-4 h-full">-->
<!--              <ul class="space-y-5 px-8 overflow-y-auto row-span-3 h-3/4">-->
<!--                <li class="max-w-lg flex gap-x-2 sm:gap-x-4">-->
<!--                  <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">-->
<!--                    <h2 class="font-medium text-gray-800 ">-->
<!--                      How can we help?-->
<!--                    </h2>-->
<!--                    <div class="space-y-1.5">-->
<!--                      <p class="mb-1.5 text-sm text-gray-800">-->
<!--                        You can ask questions like:-->
<!--                      </p>-->
<!--                      <ul class="list-disc list-outside space-y-1.5 ps-3.5">-->
<!--                        <li class="text-sm text-gray-800 ">-->
<!--                          What's Preline UI?-->
<!--                        </li>-->

<!--                        <li class="text-sm text-gray-800 ">-->
<!--                          How many Starter Pages & Examples are there?-->
<!--                        </li>-->

<!--                        <li class="text-sm text-gray-800 ">-->
<!--                          Is there a PRO version?-->
<!--                        </li>-->
<!--                      </ul>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  &lt;!&ndash; End Card &ndash;&gt;-->
<!--                </li>-->
<!--                &lt;!&ndash; End Chat &ndash;&gt;-->

<!--                &lt;!&ndash; Chat &ndash;&gt;-->
<!--                <li class="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">-->
<!--                  <div class="grow text-end space-y-3">-->
<!--                    &lt;!&ndash; Card &ndash;&gt;-->
<!--                    <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">-->
<!--                      <p class="text-sm text-white">-->
<!--                        what's preline ui?-->
<!--                      </p>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; End Card &ndash;&gt;-->
<!--                  </div>-->
<!--                </li>-->

<!--              </ul>-->

<!--              <div class="row-span-1 h-1/4">-->
<!--                <MessagesMessageInput :id="user._id"/>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash;                <MessagesMessageContainer />&ndash;&gt;-->
<!--          </div>-->

        </div>

    </div>
    <Footer />


</template>



<script setup>
import {useConversationStore} from "~/stores/useConversationStore.js";
import useGetConversations from "~/composables/useGetConversations.js";
import useGetMessages from "~/composables/useGetMessages.js";
import {onMounted, ref} from "vue";
import {useCustomFetch} from "~/composables/useCustomFetch.js";
const conversations = ref([]);
const loading = ref(false);
// const {conversations, loading: conversationLoading} = useGetConversations();
const { selectedConversation, setSelectedConversation } = useConversationStore();
const toast = useToast();
const messages = ref([]);
const { user, token } = useAuthStore();
const userSelected = ref({});


onMounted(async()=>{
  // chats
  // console.log(chats,'hellll')
  // const { messages} = useGetMessages('674689b7af09dbfdeeda51a3');
  // console.log(messages,'this are our messages');
  // useGetMessages('674689b7af09dbfdeeda51a3');
  // getMessages('674689b7af09dbfdeeda51a3')
})

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 21) return '2 weeks ago';
  if (diffInDays < 28) return '3 weeks ago';
  return `${Math.floor(diffInDays / 30)} months ago`;
}


const getMessages = async (id) => {

  loading.value = true

  const URLparams = new URLSearchParams({
    id: user._id
  })

  try {
    const res = await useCustomFetch(`/messages/${id}?${URLparams}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res
    console.log(data,'this is our data')
    // if (data.error) throw new Error(data.error)
    messages.value = data
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

const handleMessageDisplay = (userDisplay) => {
  console.log(userDisplay,'we have the user')
  const {_id} = userDisplay
  // const {messages,loading: messageLoading} = useGetMessages(id);
  // setSelectedConversation(id);
  // useGetMessages(id);
  getMessages(_id);
  userSelected.value = userDisplay;
}

watch(()=> userSelected.value,(newId) => {
  handleMessageDisplay(newId)
})


const getConversations = async () => {
  loading.value = true;


  const URLparams = new URLSearchParams({
    id: user._id
  });

  await useCustomFetch(`/messages/matched?${URLparams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {
    conversations.value = response;

  }).catch(() => {
    console.log('failed');
  }).finally(() => {
    loading.value = false;
  });
};

onMounted(async () => {
  await getConversations();
});


// console.log(chats,'hellll')




</script>