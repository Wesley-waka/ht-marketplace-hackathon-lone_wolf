<template>
    <Navbar />
    
    <div class="max-w-[84rem] mx-auto">

        <div class="flex flex-row justify-between">
            <div class="flex flex-row">
                <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png" class="h-[60px] w-[60px]"alt="">
                <h2>JohnDeere6R</h2>
            </div>
            <div class="flex flex-row space-x-5">
                <div>
                    <img src="/Sunset Blaze/HT_ICONS_ORANGE-50.png" class="h-[30px] w-[30px]" alt="">
                    <p class="font-manropeBold text-green-400" style="text-decoration: underline; text-decoration-color: green;">Share</p>
                </div>
                <div>
                    <img src="/Sunset Blaze/HT_ICONS_ORANGE-29.png" class="h-[30px] w-[30px]" alt="">
                    <p class="font-manropeBold" style="text-decoration: underline; text-decoration-color: green;">Share</p>
                </div>
            </div>
        </div>

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
        <div class="flex flex-row">
            <div class="p-1 bg-[#ff81a2] flex flex-row items-center justify-around my-4 w-max rounded-md">
            <p class="font-manropeBold text-black text-sm">First Registration from 2023
            </p>
            </div>
        </div>

        <div>
            
            <img src="../../assets/images/JohnDeere6R.png" alt="">
        </div>


        <div>
            <h2>
                Details
            </h2>

            <div>
                <h2>Track Name</h2>
                <p>JohnDeere6R</p>

                <h2>Track Brand</h2>
                <p>JohnDeere6R</p>

                <h2>Track Cost</h2>
                <p>JohnDeere6R</p>

                <h2>Track HP</h2>
                <p>JohnDeere6R</p>

                <h2>Track Engine/hr Used</h2>
                <p>JohnDeere6R</p>

                <h2>Track VehicleID</h2>
                <p>JohnDeere6R</p>

                <h2>Track Location</h2>
                <p>JohnDeere6R</p>

                <h2>Track FuelType</h2>
                <p>JohnDeere6R</p>

                <h2>Track Engine Conditions</h2>
                <p>JohnDeere6R</p>


                <h2>Track Consumption</h2>
                <p>JohnDeere6R</p>

                <h2>Track Tyre Condition</h2>
                <p>JohnDeere6R</p>

                <h2>Track type</h2>
                <p>JohnDeere6R</p>

                <h2>Track interioir Features</h2>
                <p>john-deere</p>

                <h2>Track Exterior Features</h2>
                <p>john-deere</p>

                <h2>Track price comparison</h2>
                <p>90%</p>

                <h2>Seller deatails</h2>

                <h2>Seller Name</h2>
                <p>Jason</p>

                <h2>Total Reviews</h2>
                <p>91</p>

                <h2>Price ratio</h2>
                <p>9%</p>

                <button class="btn btn-secondary outlined">
                    match
                </button>
            </div>

        </div>
    </div>

    <!-- images -->
 

    <Footer />
</template>



<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>
