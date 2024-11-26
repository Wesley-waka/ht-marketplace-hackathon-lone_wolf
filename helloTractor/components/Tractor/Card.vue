<template>
  <div class="flex flex-row bg-white rounded-md space-x-3">
    <div class="w-2/6">
      <img src="../../assets/images/JohnDeere6R.png" alt="" class=" bg-[#e8f8fb]">
    </div>
    <div class="w-4/6">
      <div class="flex flex-row justify-between">
        <h4 class="text-3xl my-1">JohnDeere6R</h4>
        <div v-if="allProducts">
          <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-50.png" class="w-[40px] h-full cursor-pointer" alt=""
            @click="addToFavorites">
        </div>
        <div v-else class="flex flex-col space-y-2">
          <button class="btn btn-primary outlined" @click="matchUser()">Connect with User</button>
          <button class="btn btn-primary">Remove Favourite</button>
        </div>
      </div>
      <div class="flex flex-row space-x-4 my-3">
        <!-- E/hr used -->
        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/Hello Tractor_RGB_BLACK_-Settings.png" class="h-[30px] w-[30px]" alt="">
          <p>0 hrs</p>
        </div>

        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/Hello Tractor_RGB_BLACK_-Schedule.png" class="h-[30px] w-[30px]" alt="">
          <p>9/2024</p>
        </div>

        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/HT_ICONS_BLACK_RGB-55.png" class="h-[30px] w-[30px]" alt="">
          <p>125hp</p>
        </div>

        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/HT_ICONS_BLACK_RGB-56.png" class="h-[30px] w-[30px]" alt="">
          <p>Hydraulic Cost</p>
        </div>
      </div>

      <div class="flex flex-row space-x-4 mt-4">
        <div class="flex flex-row flex-wrap w-full space-x-2">
          <div class="p-1 bg-orange-200 flex flex-row items-center justify-around my-4 w-max rounded-md">
            <p class="font-manropeBold text-orangeTint text-[10px]">First Registration from 2023</p>
          </div>

          <div class="p-1 bg-orange-200 flex flex-row items-center justify-around my-4 w-max rounded-md">
            <p class="font-manropeBold text-orangeTint text-[10px]">First Registration from 2023</p>
          </div>
        </div>
      </div>

      <div class="flex flex-row space-x-48 items-center mt-2 w-full">
        <div class="flex flex-row">
          <img src="/public/Black/HT_ICONS_BLACK_RGB-05.png" class="h-[40px] w-[40px]" alt="">
          <div>
            <h4 class="text-lg">Netherlands, delivery:</h4>
            <p>Delivery not available</p>
          </div>
        </div>

        <div>
          <h3 class="font-merriWeatherBold">KES 300,000</h3>
          <h3 class="text-sm">KES 300,000 without VAT</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["product", "allProducts"]);

const addToFavorites = async () => {
  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: props.product._id })
    });

    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }

    const result = await response.json();
    console.log('Product added to favorites:', result);
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

const matchUser = async (id) => {
  try {
    const res = await useCustomFetch(`/api/messages/match_user?id=${props.product._id}`, { method: 'GET' })

    if (res.status !== 200) {
      throw new Error('Failed to match user')
    }

    router.navigate('/messages')
  } catch (error) {
    // Handle the error appropriately
    console.error('Error matching user:', error.message)
    // Optionally, add error handling logic like showing a toast or error message
  }
}
</script>