<template>
    <nuxt-link :to="`/tractors/${tractor._id}`">
    <div class="flex flex-row space-x-8 bg-white">
                                <div>
                                    <img src="../../assets/images/JohnDeere6R.png" alt="" class="h-[230px] w-[300px] p-2 bg-[#e8f8fb]">
                                </div>
                                <div class="">
                                    <h4>JohnDeere6R</h4>
                                    <div class="flex flex-row space-x-4">
                                        <!-- E/hr used -->
                                        <div class="flex flex-row space-x-1 items-center">
                                            <img src="/public/Black/Hello Tractor_RGB_BLACK_-Settings.png" class="h-[30px] w-[30px]" alt="" >
                                            <p>0 hrs</p>
                                        </div>

                                        <div class="flex flex-row space-x-1 items-center">
                                            <img src="/public/Black/Hello Tractor_RGB_BLACK_-Schedule.png" class="h-[30px] w-[30px]" alt="" >
                                            <p>9/2024</p>
                                        </div>

                                        <div class="flex flex-row space-x-1 items-center">
                                            <img src="/public/Black/HT_ICONS_BLACK_RGB-55.png" class="h-[30px] w-[30px]" alt="" >
                                            <p>125hp</p>
                                        </div>

                                        <div class="flex flex-row space-x-1 items-center">
                                            <img src="/public/Black/HT_ICONS_BLACK_RGB-56.png" class="h-[30px] w-[30px]" alt="" >
                                            <p>Hydraulic Cost</p>
                                        </div>

                                        
                                    </div>

                                    <div class="flex flex-row space-x-4 mt-4">
                                        <div class="p-1 bg-[#ff81a2] flex flex-row items-center justify-around my-4 w-max rounded-md"> 
                                        <p class="font-manropeBold text-black text-sm">First Registration from 2023
                                        </p>
                                        
                                    </div>

                                    </div>

                                    <div class="flex flex-row justify-between mt-2 ">
                                        <div class="flex flex-row">
                                            <img src="/public/Black/HT_ICONS_BLACK_RGB-05.png" class="h-[40px] w-[40px]" alt="">
                                            
                                            <div>
                                                <h2>Netherlands,delivery:</h2>
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
                        </nuxt-link>
</template>


<script setup>
const props = defineProps(["product"]);
const emit = defineEmits(["selectProduct"]);

</script>