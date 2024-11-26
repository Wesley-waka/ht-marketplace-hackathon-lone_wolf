<template>
    <div class="bg-white mx-auto justify-center">
      <div class="h-16 p-2 flex space-x-8 align-middle max-w-[84rem] px-6 mx-auto px-10 justify-between">
        <div class="flex flex-row space-x-5 align-middle">
          <img class="h-10" src="../../assets/images/logo_medium.png" alt="">
          <div class="flex flex-row space-x-5 mt-3">
            <h3>Buy</h3>
            <h3>Sell</h3>
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
      
      
      <!-- LOGIN FORM -->
      <div v-if="sign_in" class="h-full overflow-auto flex flex-col">
        <div class="flex items-center mx-auto px-3">
        <img src="/logo.png" alt="logo" class="h-12 mb-4" />

          <div class="flex items-center gap-1">
            
          </div>
        </div>

        <div class="my-auto flex flex-col space-y-2">
        
        <form
          class="m-auto max-w-[400px] flex-grow space-y-3"
          @submit.prevent="handleSignInSubmit"
        >
          <div>
            <h1 class="text-2xl font-semibold text-center">Login</h1>
            <p class="text-center text-gray-500 mb-6">
              Login to your account to continue
            </p>
          </div>
          <CustomInputContainer
            label="Email"
            required
            :error="v$.emailAddress.$error"
            :errorMessage="v$.emailAddress.$errors[0]?.$message"
          >
            <InputGroup>
              <InputGroupAddon>
                <i class="fas fa-envelope"></i>
              </InputGroupAddon>
              <InputText
                v-model="emailAddress"
                placeholder="Email Address"
                @blur="v$.emailAddress.$touch()"
                :invalid="v$.emailAddress.$error"
              />
            </InputGroup>
          </CustomInputContainer>
          <CustomInputContainer
            label="Password"
            required:error="v$.password.$error"
            :errorMessage="v$.password.$errors[0]?.$message"
          >
            <InputGroup>
              <InputGroupAddon>
                <i class="fas fa-lock"></i>
              </InputGroupAddon>
              <Password
                v-model="password"
                toggleMask
                :feedback="false"
                placeholder="Password"
                @blur="v$.password.$touch()"
                :invalid="v$.password.$error"
              />
            </InputGroup>
          </CustomInputContainer>
          <div class="flex justify-between flex-col space-y-2 items-center w-full">
            
            <button class="w-full btn btn-primary" type="submit" :disabled="loading">
              <i v-if="loading" class="animate-spin mr-2 pi pi-spinner"></i>
              Login
            </button>

            
          </div>
        </form>

        <button class="w-full btn btn-primary outlined max-w-[254px] items-center mx-auto" @click="sign_in = false,user_selector = true" :disabled="loading">
              <i v-if="loading" class="animate-spin mr-2 pi pi-spinner"></i>
              Sign Up
            </button>
            </div>
      </div>





      <!-- USER TYPE SELECTOR -->
      <div v-if="user_selector">
        <div class="w-full mx-auto">
          <h1 class="text-2xl text-center">Join as a Buyer or Seller</h1>
          <div class="flex flex-row justify-around my-12">
            <div class="w-[300px] h-[140px] py-2 px-4 bg-slate-100 rounded-lg">
              <div>
                <img src="/public/Black/Hello Tractor_RGB_BLACK_-User.png" class="w-[50px]" alt="">
              </div>
              <p class="font-manropeSemiBold">Buyer,Buy farm equipment <br>and other products</p>
            </div>

            <div class="w-[300px] h-[140px] py-2 px-4 bg-slate-100 rounded-lg">
              <div>
                <img src="/public/Black/HT_ICONS_BLACK_RGB-02.png" class="w-[50px]" alt="">
              </div>
              <p class="font-manropeSemiBold">Seller,Sell used Tractors  <br>and other products</p>
            </div>

            
            
          </div>

          <div class="flex flex-col items-center justify-center w-full">
  <button class="btn btn-primary w-[300px]" @click="user_selector = false,sign_up = true">Join as a Buyer</button>
</div>
        </div>
      </div>
      <!-- SIgn Up form -->
       
      <div v-if="sign_up"> 
        <div class="w-full h-[600px]">
        <h1 class="text-2xl text-center">Sign up to hire talent</h1>

        

        <div class=" mt-4">
        <Divider layout="vertical" class="!hidden md:!flex"><b>OR</b></Divider>
        <div class="max-w-[400px] mx-auto my-6">
          <form @submit.prevent="handleSignUpSubmit" >
            <div>
            <CustomInputContainer
              label="Images"
              required
              :error="v$.src.$error"
              :errorMessage="v$.src.$errors[0]?.$message">
              <div class="card flex flex-col items-center gap-6">
              <img v-if="src" :invalid="v$.src.$error" :src="src" alt="Image" class="shadow-md rounded-full w-40" />
              <div v-else class="outlined">
                <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-32.png" class="w-40" alt="">
              </div>
              <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined">
                <template #uploadicon>
                  <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-29.png" alt="">
                </template>
                <template #content>
                  <span class="p-button-label">Upload</span>
                </template>
              </FileUpload>
            </div>
            </CustomInputContainer>
            
          </div>

       
        <div class="flex flex-row space-x-2 w-full">
          <CustomInputContainer
              label="First Name"
              required
              :error="v$.first_name.$error"
              :errorMessage="v$.first_name.$errors[0]?.$message"
              class="w-1/2"
            >
          
              <InputText
                v-model="formDataSignUp.first_name"
                @blur="v$.first_name.$touch"
                :invalid="v$.first_name.$error"
              />
            </CustomInputContainer>
            <CustomInputContainer
              label="Last Name"
              required
              :error="v$.last_name.$error"
              class="w-1/2"
              :errorMessage="v$.last_name.$errors[0]?.$message"
            >
              <InputText
                v-model="formDataSignUp.last_name"
                @blur="v$.last_name.$touch"
                :invalid="v$.last_name.$error"
              />
            </CustomInputContainer>
        </div>

          <CustomInputContainer
            label="Email"
            required
            :error="v$.email.$error"
            :errorMessage="v$.email.$errors[0]?.$message"
          >
            <InputText
              v-model="formDataSignUp.email"
              @blur="v$.email.$touch"
              :invalid="v$.email.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Phone Number"
            required
            :error="v$.phone_number.$error"
            :errorMessage="v$.phone_number.$errors[0]?.$message"
          >
            <InputText
              type="number"
              v-model="formDataSignUp.phone_number"
              @blur="v$.phone_number.$touch"
              :invalid="v$.phone_number.$error"
            />
          </CustomInputContainer>

          <div class="flex flex-row space-x-2 w-full">
            <CustomInputContainer
              label="ID Type"
              required
              class="w-1/2"

              :error="v$.id_type.$error"
              :errorMessage="v$.id_type.$errors[0]?.$message"
            >
              <Select
                v-model="formDataSignUp.id_type"
                :options="idTypes"
                optionLabel="label"
                optionValue="value"
                @blur="v$.id_type.$touch"
                :invalid="v$.id_type.$error"
              />
            </CustomInputContainer>
            <CustomInputContainer
              label="ID Number"
              required
              class="w-1/2"
              :error="v$.id_number.$error"
              :errorMessage="v$.id_number.$errors[0]?.$message"
            >
              <InputText
                type="number"
                v-model="formDataSignUp.location"
                @blur="v$.id_number.$touch"
                :invalid="v$.id_number.$error"
              />
            </CustomInputContainer>
          </div>

          <!-- <CustomInputContainer :error="v$.id_number.$error"
          :errorMessage="v$.location.$errors[0]?.$message" required label="Location">
            <InputText type="text" :invalid="v$.location.$error" v-model="formDataSignUp.location" readonly />
            <InputText type="text" :invalid="v$.location.$error" v-model="formDataSignUp.location"  />
          </CustomInputContainer> -->

          

          
          <button class="btn btn-primary w-full my-4" >
            Sign Up
          </button>
            
        </form>
        </div>
       
    </div>
      </div>
    </div>
     



      
    
      


      <!-- <Stepper :value="currentStep" linear @update:value="currentStep = $event">
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
      </Stepper> -->
    </Dialog>
  </template>
  
<script setup>
  import moment from 'moment';
  import useVuelidate from "@vuelidate/core";
  import { email, required, helpers,
  minLength,
  maxLength } from "@vuelidate/validators";
  // import { useNuxtApp, useRouter } from '#app';

  // for login
  // const { signIn } = useAuth();

  //intializa ref

  const onSelectedFiles = (event) => {
    files.value = event.files;
    form.value.images = files.value;
    console.log(files.value, 'this is the file');
    files.value.forEach((file) => {
      totalSize.value += parseInt(formatSize(file.size));
    });
};

const location = ['36.811667','-1.266944']

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};


const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = (event) => {
  console.log(event.files, 'Uploaded files');
  toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};




function onFileSelect(event) {
  const file = event.files[0];
  const reader = new FileReader();
  console.log(file, 'this is the file');
  reader.onload = async (e) => {
    src.value = e.target.result;
    formDataSignUp.value.images = [file.objectURL];
  };

  reader.readAsDataURL(file);
}
  const emailAddress = ref("");
  const password = ref("");
  const loading = ref(false);
  const sign_in = ref(true);
  const user_selector = ref(false);
  const sign_up = ref(false);
  const dataLoading = ref(false);

  const current = ref(false);
  const next = ref(false);
  

  const src = ref(null);
  const visible = ref(false);
  const { $toast } = useNuxtApp();
  const router = useRouter();
  const formData = ref({
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
      location: "",
    });

    const formDataSignUp = ref({
      first_name: "",
      last_name: "",
      src,
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
      location: "",
    });
  
    const handleModalDisplay = (current, next) => {
      // console.log(current, next);
      current = false;
      next = true;
    };

const rules = computed(() => {
  return {
    first_name: {
      required: helpers.withMessage("First name is required", required),
    },
    last_name: {
      required: helpers.withMessage("Last name is required", required),
    },
    src: {
      required: helpers.withMessage("Image is required", required),
    },
    image: {
      required: helpers.withMessage("Image is required", required),
    },
    location: {
      required: helpers.withMessage("Location is required", required),
    },
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Invalid email", email),
    },
    phone_number: {
      required: helpers.withMessage("Phone number is required", required),
    },
    date_of_birth: {
      required: helpers.withMessage("Date of birth is required", required),
    },
    id_type: { required: helpers.withMessage("ID type is required", required) },
    id_number: {
      required: helpers.withMessage("ID number is required", required),
    },
    ssn: {
      required: helpers.withMessage("SSN is required", required),
      minLengthValue: helpers.withMessage(
        "SSN must be 11 characters",
        minLength(11)
      ),
      maxLengthValue: helpers.withMessage(
        "SSN must be 11 characters",
        maxLength(11)
      ),
    },
    address: {
      required: helpers.withMessage("Address line 1 is required", required),
    },
    city: { required: helpers.withMessage("City is required", required) },
    state: { required: helpers.withMessage("State is required", required) },
    zipcode: { required: helpers.withMessage("Zipcode is required", required) },
    emailAddress: {
      // required: helpers.withMessage("Email Address is required", required),
      // email: helpers.withMessage("Invalid Email Address", email),
    },
    password: {
      // required: helpers.withMessage("Password is required", required),
    },
  };
});

// const v$ = useVuelidate(rules, formData);

const v$ = useVuelidate(rules, {formDataSignUp,formData});


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

  const reverseGeocode = (latitude, longitude) =>{
      const apiKey = 'YOUR_API_KEY'; // Replace with your reverse geocoding API key
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=-1.266944&longitude=36.811667&localityLanguage=en`;
     

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.formDataSignUp.location = data.city || data.locality || data.principalSubdivision || 'Location not found';
        })
        .catch(error => {
          console.error('Error fetching location name:', error);
          this.formData.location = 'Location not found';
        });
    }

    // for login

    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            reverseGeocode(latitude, longitude);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                location.value = "User denied the request for Geolocation.";
                break;
              case error.POSITION_UNAVAILABLE:
                location.value = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                location.value = "The request to get user location timed out.";
                break;
              case error.UNKNOWN_ERROR:
                location.value = "An unknown error occurred.";
                break;
            }
          }
        );
      } else {
        location.value = "Geolocation is not supported by this browser.";
      }
    };

  const handleSignInSubmit = async() => {
    loading.value = true;
    v$.value.$touch();
  
    if (v$.value.$error) {
      $toast.error("Please fill in the required fields");
      loading.value = false;
      return;
    }
  
    // await signIn("credentials", {
    //   email: emailAddress.value,
    //   password: password.value,
    //   callbackUrl: "/",
    // })
    //   .catch((err) => {
    //     $toast.error("Email or password is incorrect!");
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //      visible.value = false;
    //   });
  }


  
  const handleSignUpSubmit = async() => {
    console.log(formDataSignUp.value, 'this is the form data');
    console.log(reverseGeocode(-1.266944,36.811667),'this is our location')

    loading.value = true;
    v$.value.$touch();
  

    if (v$.value.$error) {
      $toast.error("Please fill in the required fields");
      loading.value = false;
      return;
    }
    // await signUp({
    //   email: emailAddress.value,
    //   password: password.value,
    // })
    //   .then(() => {
    //     $toast.success("Registration successful. Please check your email for login details");
    //     router.push("/auth/login");
    //   })
    //   .catch((err) => {
    //     $toast.error("Registration failed");
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //      visible.value = false;
    //   });
  }

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



    const showError = (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    }

    onMounted(() => {
      fetchLocation();
      reverseGeocode(-1.266944,36.811667);
    });






const handleSubmit = async () => {
  loading.value = true;
  v$.value.$touch();

  if (v$.value.$error) {
    $toast.error("Please fill in the required fields");
    loading.value = false;
    return;
  }

  // await signIn("credentials", {
  //   email: emailAddress.value,
  //   password: password.value,
  //   callbackUrl: "/",
  // })
  //   .catch((err) => {
  //     $toast.error("Email or password is incorrect!");
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
};
  };
  </script>