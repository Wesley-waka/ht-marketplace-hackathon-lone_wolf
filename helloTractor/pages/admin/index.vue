<template>

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

</template>

<script setup>
import { useAuthAPI } from '~/composables/useAuthAPI';
import { useTractorsAPI } from '~/composables/useTractorsAPI';

const page = ref(1);
const pageSize = ref(10);
const searchText = ref('');
const user = ref('');
const { getAllUsers} = useAuthAPI();
const { getAllTractors} = useTractorsAPI();
const systemHealth = ref(null);
const userGrowth = ref(false);


const dataList = ref([]);
const currentUserCount = ref(0);
const previousUserCount = ref(0);
const userGrowthRate = ref(0);

const fetchTractorsData = async () => {
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

const fetchUsersData = async () => {
  dataLoading.value = true;
  await getAllUsers({
    page: page.value,
    pageSize: pageSize.value,
    search: searchText.value,
    user: user.value,
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

const fetchUserData = async (period) => {
  try {
    const response = await getAllUsers({ period });
    return response.data.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};


const calculateUserGrowth = async () => {
  const currentPeriod = 'march-2024'; // Adjust the period as needed
  const previousPeriod = 'december-2024'; // Adjust the period as needed

  currentUserCount.value = await fetchUserData(currentPeriod);
  previousUserCount.value = await fetchUserData(previousPeriod);

  if (previousUserCount.value > 0) {
    userGrowthRate.value = ((currentUserCount.value - previousUserCount.value) / previousUserCount.value) * 100;
  } else {
    userGrowthRate.value = 0;
  }
};


const { approvedCount, notApprovedCount } = products.reduce(
  (acc, product) => {
    if (product.isApproved) {
      acc.approvedCount += 1;
    } else {
      acc.notApprovedCount += 1;
    }
    return acc;
  },
  { approvedCount: 0, notApprovedCount: 0 }
);



watch(
  [page, pageSize, searchText,user],
  () => {
    fetchData();
  },
  { deep: true }
);


onMounted(() => {
    fetchUsersData();
    fetchTractorsData();
});

</script>