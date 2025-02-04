<template>
    <Navbar />
    <div class="bg-slate-100 py-10 h-max">
        <div class="max-w-[72rem] px-6 mx-auto grid grid-cols-4 gap-4 ">
            <div class="col-span-1 bg-white rounded-md " style="height: 760px;">
                <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                    <h2>Messages</h2>

                </div>
                <div>
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
            <div class="col-span-3 bg-white rounded-md">
              <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">

                <div class="flex items-center ">

                  <div class="w-[50px] relative">
                    <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png"
                         class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                         alt="User Avatar">
                    <div
                        class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                    </div>
                  </div>

                  <h6>John Deere6R</h6>

                </div>






              </div>

              <div class="grids grid-rows-4 h-full">
                <ul class="space-y-5 px-8 overflow-y-auto row-span-3 h-3/4">
              <li class="max-w-lg flex gap-x-2 sm:gap-x-4">
                <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                  <h2 class="font-medium text-gray-800 ">
                    How can we help?
                  </h2>
                  <div class="space-y-1.5">
                    <p class="mb-1.5 text-sm text-gray-800">
                      You can ask questions like:
                    </p>
                    <ul class="list-disc list-outside space-y-1.5 ps-3.5">
                      <li class="text-sm text-gray-800 ">
                        What's Preline UI?
                      </li>

                      <li class="text-sm text-gray-800 ">
                        How many Starter Pages & Examples are there?
                      </li>

                      <li class="text-sm text-gray-800 ">
                        Is there a PRO version?
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- End Card -->
              </li>
              <!-- End Chat -->

              <!-- Chat -->
              <li class="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div class="grow text-end space-y-3">
                  <!-- Card -->
                  <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                    <p class="text-sm text-white">
                      what's preline ui?
                    </p>
                  </div>
                  <!-- End Card -->
                </div>
              </li>

              </ul>

                <div class="row-span-1 h-1/4">
                <MessagesMessageInput/>
                </div>
              </div>


<!--                <MessagesMessageContainer />-->
            </div>


        </div>

    </div>
    <Footer />


</template>



<script setup>


</script>