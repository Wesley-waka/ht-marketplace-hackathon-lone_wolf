<template>
    <div class="bg-white mx-auto justify-center">
      <div class="h-16 p-2 flex space-x-8 align-middle max-w-[84rem] px-6 mx-auto px-10 justify-between">
        <div class="flex flex-row space-x-5 align-middle">
          <img class="h-10" src="../../assets/images/logo_medium.png" alt="">
          <div class="flex flex-row space-x-5 mt-3">
            <h3>Buy</h3>
            <h3>How it works</h3>
            <h3>Services</h3>
            <h3>Farm Equipments</h3>
            <h3>Orders</h3>
          </div>
        </div>
        <div class="flex space-x-4 mt-3 items-center">
            <img src="/public/Black/HT_ICONS_BLACK_RGB-71.png" class="w-[50px]" alt="">
          <i class="pi pi-heart" style="font-size: 1.5rem"></i>

          <div class="flex align-middle mx-auto space-x-2" @click="visible = true">
            <img src="/login.svg" class="h-8" alt="">
            <h3 class="mt-1">Login</h3>
          </div>
        </div>
      </div>
    </div>
    <hr>
  
    <Dialog v-model:visible="visible" modal header="Welcome Back" :style="{ width: '900px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <Stepper :value="currentStep" linear @update:value="currentStep = $event">
        <StepList>
          <Step value="1" :class="{ 'p-complete': Number(currentStep) > 1 }">
            Personal Details
          </Step>
          <Step value="2" :class="{ 'p-complete': Number(currentStep) > 2 }">
            Business Details
          </Step>
          <Step value="3" :class="{ 'p-complete': Number(currentStep) > 3 }">
            Product Selection
          </Step>
          <Step value="4" :class="{ 'p-complete': Number(currentStep) > 4 }">
            Validation
          </Step>
        </StepList>
  
        <StepPanels class="border rounded-md overflow-auto !py-2" style="height: calc(100vh - 200px)">
          <StepPanel v-slot="{ activateCallback }" value="1">
            <AuthPersonal :data="personal" @update="(data) => { personal.value = data; activateCallback('2'); }" />
          </StepPanel>
  
          <StepPanel v-slot="{ activateCallback }" value="2">
            <AuthBusiness :data="business" @back="activateCallback('1')" @update="(data) => { business.value = data; activateCallback('3'); }" />
          </StepPanel>
  
          <StepPanel v-slot="{ activateCallback }" value="3">
            <AuthProducts :data="products" @back="activateCallback('2')" @update="(data) => { products.value = data; activateCallback('4'); }" />
          </StepPanel>
  
          <StepPanel value="4">
            <div class="px-0 text-sm">
              <div class="flex justify-between items-center py-1 mt-1 border-b">
                <button type="button" @click="currentStep = '2'" class="btn-dark">
                  <i class="fas fa-chevron-left"></i> Back
                </button>
  
                <button type="button" class="btn-primary" :disabled="isLoading || !terms" @click="handleSubmit">
                  {{ isLoading ? "Loading..." : "Submit" }}
                </button>
              </div>
  
              <div style="height: calc(100vh - 300px)">
                <div class="overflow-auto h-full pb-6 pt-1">
                  <h4 class="text-lg font-semibold bg-gray-100 px-2">Personal Details</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                    <div class="flex space-x-1">
                      <span>First Name:</span>
                      <span class="font-semibold">{{ personal.first_name }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Last Name:</span>
                      <span class="font-semibold">{{ personal.last_name }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Email:</span>
                      <span class="font-semibold">{{ personal.email }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Phone:</span>
                      <span class="font-semibold">{{ personal.phone_number }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Date of Birth:</span>
                      <span class="font-semibold">{{ moment(personal.date_of_birth).format("ll") }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>ID/Passport Number:</span>
                      <span class="font-semibold">{{ personal.id_number }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Address 1:</span>
                      <span class="font-semibold">{{ personal.address }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Address 2:</span>
                      <span class="font-semibold">{{ personal.address_line_2 }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>City:</span>
                      <span class="font-semibold">{{ personal.city }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Country:</span>
                      <span class="font-semibold">{{ personal.state }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Zipcode:</span>
                      <span class="font-semibold">{{ personal.zipcode }}</span>
                    </div>
                  </div>
  
                  <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Next of Kin</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                    <div class="flex space-x-1">
                      <span>First Name:</span>
                      <span class="font-semibold">{{ business.next_of_kin_first_name }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Last Name:</span>
                      <span class="font-semibold">{{ business.next_of_kin_last_name }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Phone:</span>
                      <span class="font-semibold">{{ business.next_of_kin_phone_number }}</span>
                    </div>
                  </div>
  
                  <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Sponsor Information</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                    <div class="flex space-x-1">
                      <span>Number:</span>
                      <span class="font-semibold">{{ business.sponsor_number }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Name:</span>
                      <span class="font-semibold">{{ business.sponsor_name }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Phone:</span>
                      <span class="font-semibold">{{ business.sponsor_phone_number }}</span>
                    </div>
                  </div>
  
                  <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Upline Distributor's Information</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                    <div class="flex space-x-1">
                      <span>Number:</span>
                      <span class="font-semibold">{{ business.upline_number }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Name:</span>
                      <span class="font-semibold">{{ business.upline_name }}</span>
                    </div>
                    <div class="flex space-x-1">
                      <span>Phone:</span>
                      <span class="font-semibold">{{ business.upline_phone_number }}</span>
                    </div>
                  </div>
  
                  <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Products</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                    <template v-for="product in products" :key="product._id">
                      <div class="flex space-x-1">
                        <span>{{ product?.title }} ({{ product?.selectedQty }})</span>
                      </div>
                    </template>
                  </div>
                </div>
  
                <div class="mt-2 pt-2 flex items-center border-t">
                  <Checkbox v-model="terms" binary />
                  <span class="ml-2 text-sm">
                    I agree to the <NuxtLink to="#" class="text-blue-800 underline">terms and conditions</NuxtLink>
                  </span>
                </div>
              </div>
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </Dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import moment from 'moment';
  import { useNuxtApp, useRouter } from '#app';
  
  const visible = ref(false);
  const { $toast } = useNuxtApp();
  const router = useRouter();
  
  const personal = ref({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: new Date(),
    id_type: "",
    id_number: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  
  const business = ref({
    next_of_kin_first_name: "",
    next_of_kin_last_name: "",
    next_of_kin_phone_number: "",
    sponsor_number: "",
    sponsor_name: "",
    sponsor_phone_number: "",
    upline_number: "",
    upline_name: "",
    upline_phone_number: "",
    next_of_kin_email: "",
  });
  
  const products = ref([]);
  const terms = ref(false);
  const currentStep = ref("1");
  const isLoading = ref(false);
  
  const handleSubmit = async () => {
    isLoading.value = true;
  
    personal.value.date_of_birth = moment(personal.value.date_of_birth).format("DD/MM/YYYY");
  
    const payload = {
      firstName: personal.value.first_name,
      lastName: personal.value.last_name,
      email: personal.value.email,
      ssn: personal.value.ssn,
      phone: personal.value.phone_number,
      idType: personal.value.id_type,
      idNumber: personal.value.id_number,
      dateOfBirth: personal.value.date_of_birth,
      role: "user",
      addresses: [
        {
          location: personal.value.address,
          city: personal.value.city,
          state: personal.value.state,
          zipCode: personal.value.zipcode,
        },
      ],
      nextOfKin: {
        name: `${business.value.next_of_kin_first_name} ${business.value.next_of_kin_last_name}`,
        email: business.value.next_of_kin_email,
        phone: business.value.next_of_kin_phone_number,
      },
      sponsor: {
        sponsorNumber: business.value.sponsor_number,
        sponsorName: business.value.sponsor_name,
        phone: business.value.sponsor_phone_number,
      },
      uplineDistributor: {
        uplineNumber: business.value.upline_number,
        uplineName: business.value.upline_name,
        phone: business.value.upline_phone_number,
      },
      wishlist: products.value.map((product) => product._id),
    };
  
    // Uncomment and adjust the following lines to integrate with your authentication logic
    // await auth.signUp(payload, undefined, { preventLoginFlow: true })
    //   .then(() => {
    //     $toast.success("Registration successful. Please check your email for login details");
    //     router.push("/auth/login");
    //   })
    //   .catch((err) => {
    //     const error = err.response?._data;
    //     console.log(error);
    //     if (error.err.length) {
    //       $toast.error(error.err[0].msg);
    //     } else {
    //       $toast.error("Registration failed");
    //     }
    //   })
    //   .finally(() => {
    //     isLoading.value = false;
    //   });
  };
  </script>