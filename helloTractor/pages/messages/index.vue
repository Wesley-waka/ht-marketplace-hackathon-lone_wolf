<template>
    <Navbar />
    <div class="bg-slate-100 py-10 h-max">
        <div class="max-w-[72rem] px-6 mx-auto grid grid-cols-4 gap-4 ">
            <div class="col-span-1 bg-white rounded-md " style="height: 400px;">
                <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                    <h2>Messages</h2>

                </div>
                <div>
                    <div class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
                        <!-- Avatar section with improved styling -->
                        <div class="relative">
                            <img 
                            src="/public/Black/HT_ICONS_BLACK_RGB-36.png" 
                            class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm" 
                            alt="User Avatar"
                            >
                            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>

                        <!-- User info section with better spacing and typography -->
                        <div class="flex flex-col ml-4 flex-grow">
                            <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                                JohnDeere6R
                                </h2>
                                <div class="flex items-center mt-0.5">
                                <span class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                    Buyer
                                </span>
                                <span class="text-xs text-gray-500 ml-3">
                                    2 weeks ago
                                </span>
                                </div>
                            </div>
                            
                            <!-- Message icon with hover effect -->
                            <button class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                                <img 
                                src="/public/Black/HT_ICONS_BLACK_RGB-71.png" 
                                class="w-6 h-6 opacity-75 hover:opacity-100 transition-opacity duration-200" 
                                alt="Message Icon"
                                >
                            </button>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <div class="col-span-3  rounded-md flex-col justify-end  p-2" style="height: 100px;">
                
                <div class="h-[360px]  bg-white row-span-3 rounded-md" style="height: 340px;">
                    <div class=" border-b-[1px]  py-4 px-4">
                        <h2>JohnDeere6R</h2>
                        <p class="text-xs">Last replied: 2days ago</p>

                    </div>

                    <div class="p-4">
                        <div class="text-xs flex flex-col space-y-2 flex-wrap max-w-[300px]">
                            <div class="items-center bg-slate-100 w-max p-3 rounded-sm">
                            <p>Hi from Labda do You ahav</p>
    
                            </div>
                            <p class="text-xs">11:20 Tuesday</p>
                        </div>
                    </div>

                    <MessagesBubble/>

                    

                    
                    
                </div>
                    
                        
                        
                <div class=" mt-4 border-t border-gray-200 h-[40px] flex flex-row space-x-2">
                            <InputText
                            placeholder="Type a message"
                            class="w-full p-4 border-b border-gray-200"
                        />
                        <div class="  rounded-md" >
                            <img src="/public/Black/HT_ICONS_BLACK_RGB-66.png" alt="" class=" bg-orangeBright rounded-md h-[43px] w-[63px] border-2 ">
                        </div>
                </div>      
                
                
            </div>
            

        </div>
        
    </div>
    <Footer/>


</template>



<script setup>


</script>