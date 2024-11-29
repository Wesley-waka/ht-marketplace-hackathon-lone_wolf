<script default>
// import { useAuthAPI } from '~/composables/useAuthAPI';
// import { useTractorsAPI } from '~/composables/useTractorsAPI';

// const page = ref(1);
// const pageSize = ref(10);
// const searchText = ref('');
// const user = ref('');
// const { getAllUsers} = useAuthAPI();
// const { getAllTractors} = useTractorsAPI();


// const dataList = ref([]);

// // Calculate total revenue
// const calculateTotalRevenue = () => {
//   const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);

//   revenueBreakdownData.value = {
//     labels: ['Total Revenue'],
//     datasets: [
//       {
//         label: 'Revenue',
//         data: [totalRevenue],
//         backgroundColor: ['rgba(75, 192, 192, 0.2)'],
//         borderColor: ['rgba(75, 192, 192, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };
// };

// // Calculate sales over time
// const calculateSalesOverTime = () => {
//   const salesByDate = orders.reduce((acc, order) => {
//     const date = dayjs(order.date).format('YYYY-MM-DD');
//     if (!acc[date]) {
//       acc[date] = 0;
//     }
//     acc[date] += order.amount;
//     return acc;
//   }, {});

//   salesData.value = {
//     labels: Object.keys(salesByDate),
//     datasets: [
//       {
//         label: 'Sales Over Time',
//         data: Object.values(salesByDate),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       },
//     ],
//   };
// };

// const { approvedCount, notApprovedCount } = dataList.value.reduce(
//   (acc, product) => {
//     if (product.isApproved) {
//       acc.approvedCount += 1;
//     } else {
//       acc.notApprovedCount += 1;
//     }
//     return acc;
//   },
//   { approvedCount: 0, notApprovedCount: 0 }
// );


// const fetchTractorsData = async () => {
//   dataLoading.value = true;
//   await getAllTractors({
//     page: page.value,
//     pageSize: pageSize.value,
//     search: searchText.value,
//     user: user.value,
//   })
//     .then((res) => {
//       dataList.value = res.data;
//       totalSize.value = res.result || 0;
//     })
//     .catch((error) => {
//       console.error(error);
//     })
//     .finally(() => {
//       dataLoading.value = false;
//       dataLoaded.value = true;
//     });
// };

// watch(
//   [page, pageSize, searchText,user],
//   () => {
//     fetchData();
//   },
//   { deep: true }
// );




// onMounted(() => {
//     fetchUsersData();
//     fetchTractorsData();
// });

</script>

<template>

  <Navbar/>

  <div class="card w-[80rem] mx-auto py-2">
    <Tabs value="0">
        <TabList>
            <Tab value="0">Overview

              <i class="pi pi-chart-line" />
            </Tab>
            <Tab value="1" class="flex flex-row space-x-2">
              Sellers
              <img src="/Black/Hello Tractor_RGB_BLACK_-Income.png" class="w-[40px]" alt="">
              <!-- <i class="pi pi-list" /> -->
              
            </Tab>
            <Tab value="2" class="flex flex-row space-x-2">Buyers
              <!-- <i class="pi pi-list" /> -->
              <img src="/Black/Hello Tractor_RGB_BLACK_-Cart-03.png" class="w-[40px]" alt="">

              
            </Tab>
            <Tab value="3" class="flex flex-row space-x-2">Products
              <!-- <i class="pi pi-list" /> -->
              <img src="/Black/Hello Tractor_RGB_BLACK_-Production Cycle.png" class="w-[40px]" alt="">
              
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
               <div class="flex flex-row  w-full h-1/2  justify-between">
                 <AdminDashBoardProducts/>
                 <AdminDashBoardUserGrowth/>
                </div>
                <AdminDashBoardSales/>
            </TabPanel>
            <TabPanel value="1">
                <div class="flex bg-green-200  p-4">
                  <div class="w-1/6 bg-gray-200">he</div>
                  <div class="w-3/6 bg-gray-400">hy</div>
                  <div class="w-2/6 bg-gray-600">hy</div>
                </div>
            </TabPanel>
            <TabPanel value="2">
                <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p>
            </TabPanel>
        </TabPanels>
    </Tabs>
  </div>

  <Footer/>

        <!-- <Paginator
            :alwaysShow="false"
            :rows="pageSize"
            :totalRecords="totalSize"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} of {totalRecords}"
            @page="(e) => (page = e.page + 1)"
            class="!rounded-b-xl border-t mt-3"
        >
        </Paginator> -->

</template>
