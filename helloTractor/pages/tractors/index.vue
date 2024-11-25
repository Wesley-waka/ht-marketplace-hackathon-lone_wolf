<template>
    <Navbar />

<div class="bg-slate-100 py-10 h-max">

    <div class=" max-w-[84rem] px-6 mx-auto grid grid-cols-4 gap-4 ">
        <div class="col-span-1 bg-white rounded-md ">
        <!-- Content for the first child div -->
            <div class="flex flex-col space-y-2 border-b-2">
                <h2 class="p-2 px-6 font-manropeBold">Filter</h2>
                <div class="p-2 bg-orange-50 border-b-[5px] border-orange-200 shadow-md flex flex-col items-center">
                <img src="/Sunset Blaze/HT_ICONS_ORANGE-26.png" alt="" class="h-[30px] w-[30px]">
                <h2 class="font-manropeBold text-orange-500">All</h2>
                </div>
            </div>

            <div class="flex flex-col space-y-8 p-5">
                <div>
                    <h3 class="font-manropeBold">Brand</h3>
                    <CustomInputContainer
                        label=""
                        
                        class="w-[full]"
                      >
                      <Select
                        
                        :options="idTypes"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Track Brand"
                      />
                      <!-- <Select
                        v-model="filterformData.idType"
                        :options="idTypes"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Track Brand"
                      /> -->
                    </CustomInputContainer>
                </div>

                <div>
                    <h3 class="font-manropeBold">Location</h3>
                    <CustomInputContainer
                        label=""
                        
                        class="w-[full]"
                      >
                      <Select
                       
                        :options="idTypes"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Track Brand"
                      />
                    </CustomInputContainer>
                </div>

                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row justify-between align-middle items-center">
                        <h3 class="font-manropeBold">Price(KES)</h3>
                        <h6 class="p-[4px] rounded-md font-avenirBlack bg-orangeTint text-white">Cash</h6>
                    </div>
                    <div class="flex flex-row space-x-2">
                        <CustomInputContainer
                            label=""
                            
                        
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="From"
                          />
                        
                        </CustomInputContainer>
                        <CustomInputContainer
                            label=""
                            
                        
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="To"
                          />
                        
                        </CustomInputContainer>
                    </div>
                </div>

                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row justify-between">
                        <h3 class="font-manropeBold">Registration</h3>
                        
                    </div>
                    <div class="flex flex-row space-x-2">
                        <CustomInputContainer
                            label=""
                            
                        
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="From"
                          />
                        
                        </CustomInputContainer>
                        <CustomInputContainer
                            label=""
                            
                        
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="To"
                          />
                        
                        </CustomInputContainer>
                    </div>
                </div>

                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row justify-between">
                        <h3 class="font-manropeBold">Engine hours used</h3>
                        
                    </div>
                    <div class="flex flex-row space-x-2">
                        <CustomInputContainer
                            label=""
                            
                        
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="From"
                          />
                        
                        </CustomInputContainer>
                        <CustomInputContainer
                            label=""
                            
                        
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="To"
                          />
                        
                        </CustomInputContainer>
                    </div>
                </div>

                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row justify-between">
                        <h3 class="font-manropeBold">HP</h3>
                        
                    </div>
                    
                    <div class="flex flex-row space-x-2">
                        <CustomInputContainer
                            label=""
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="From"
                          />
                        
                        </CustomInputContainer>
                        <CustomInputContainer
                            label=""
                            class="flex flex-row space-x-2 w-[180px]"
                          >
                          <Select
                            :options="idTypes"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="To"
                          />
                        
                        </CustomInputContainer>
                    </div>
                </div>



                <div>
                    <h3 class="font-manropeBold">Track Type</h3>
                    <CustomInputContainer
                        label=""
                        
                        class="w-full"
                      >
                      <Select
                        
                        :options="idTypes"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Track Brand"
                      />
                    </CustomInputContainer>
                </div>
                
            </div>
        </div>
        <div class="col-span-3  px-4">
        
            <div class="w-full h-[50px] bg-white rounded-md">
                <div class="flex flex-row space-x-2 items-center rounded-md">
                    <img src="/Sunset Blaze/Hello Tractor_RGB_RED_-Cart.png" class='w-[50px] p-2 bg-orange-50' alt="">
                    <h3>Welcome to your one stop shop for tractors</h3>
                </div>

                <div
                    class="grid gap-x-5 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                    v-if="dataLoading"
                    >
                    <LoaderProductCard v-for="n in 10" :key="n" />
                </div>

                <div class="">
                    <div class="p-2 bg-orangeTint flex flex-row items-center justify-around my-4 w-max rounded-md"> 
                        <p class="font-manropeBold text-white">First Registration from 2023
                        </p>
                        <img src="/public/White/HT_ICONS_WHITE_RGB-21.png" class="h-[30px] w-[30px]">
                    </div>
                    <div class="mt-2">
                        <h2 class="font-manropeBold">Verified Cars</h2>
                        <div class="flex flex-row justify-between">
                            <div class="mt-2">
                                <h3>300 results</h3>
                            </div>
                            <Paginator
                                :alwaysShow="false"
                                :rows="pageSize"
                                :totalRecords="totalSize"
                                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} - {last} of {totalRecords}"
                                @page="(e) => (page = e.page + 1)"
                                class="!rounded-b-xl border-t mt-3"
                            >
                            </Paginator>
                        </div>

                        <div class="flex-row space-y-4">
                            


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
                            


                           

                        </div>

                    </div>

                    <TractorDetails 
                        v-for="product in dataList"
                        :key="product._id"
                        :product="product"
                        @selectProduct="selectedProduct = product"/>
                </div>


            </div>
        </div>


    </div>

    <FooterCompliance />
</div>




    <Footer />
    <!-- <li v-for="product in products" :key="product.id">
        <nuxt-link :to="`/products/${product.id}`">{{ product.name }}</nuxt-link>
      </li> -->


</template>

<script setup>
const dataList = ref([]);
const selectedProduct = ref(null);
const searchText = ref("");
const page = ref(1);
const pageSize = ref(20);
const { getAllTractors} = useTractorsAPI();


const filterformData = ref({
  idType: { label: "Indo Farm", value: "indo-farm" },
});

const idTypes = ref([
  { label: "John Deere", value: "john-deere" },
  { label: "Massey Ferguson", value: "massey-ferguson" },
  { label: "New Holland", value: "new-holland" },
  { label: "Kubota", value: "kubota" },
  { label: "Case IH", value: "case-ih" },
  { label: "Claas", value: "claas" },
  { label: "Valtra", value: "valtra" },
  { label: "Fendt", value: "fendt" },
  { label: "Deutz-Fahr", value: "deutz-fahr" },
  { label: "Same", value: "same" },
  { label: "Zetor", value: "zetor" },
  { label: "McCormick", value: "mccormick" },
  { label: "JCB", value: "jcb" },
  { label: "Landini", value: "landini" },
  { label: "Yanmar", value: "yanmar" },
  { label: "AGCO", value: "agco" },
  { label: "Ford", value: "ford" },
  { label: "Deere & Company", value: "deere-company" },
  { label: "Caterpillar", value: "caterpillar" },
  { label: "Kioti", value: "kioti" },
  { label: "LS Tractor", value: "ls-tractor" },
  { label: "Mahindra", value: "mahindra" },
  { label: "TAFE", value: "tafe" },
  { label: "Sonalika", value: "sonalika" },
  { label: "Escorts", value: "escorts" },
  { label: "Swaraj", value: "swaraj" },
  { label: "VST Tillers", value: "vst-tillers" },
  { label: "Indo Farm", value: "indo-farm" },
  { label: "Preet", value: "preet" },
  { label: "Captain", value: "captain" }]);


  const fetchData = async () => {
  dataLoading.value = true;
  await getAllTractors({
    page: page.value,
    pageSize: pageSize.value,
    search: searchText.value,
  })
    .then((res) => {
      dataList.value = res.data;
      totalSize.value = res.result || 0;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dataLoading.value = false;
      dataLoaded.value = true;
    });
};


onMounted(() => {
  fetchData();
});

watch(
  [page, pageSize, searchText],
  () => {
    fetchData();
  },
  { deep: true }
);

definePageMeta({
  layout: "default",
});
</script>


<style>
.p-paginator-page.p-paginator-page-selected {
    background: #fdc7ba !important;
    color: #ff5029 !important;
}
</style>