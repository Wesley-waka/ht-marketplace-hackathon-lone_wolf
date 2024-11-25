<script default>

import { useAuthAPI } from '~/composables/useAuthAPI';
import { useTractorsAPI } from '~/composables/useTractorsAPI';

const page = ref(1);
const pageSize = ref(10);
const searchText = ref('');
const user = ref('');
const { getAllUsers} = useAuthAPI();
const { getAllTractors} = useTractorsAPI();


const dataList = ref([]);

// Calculate total revenue
const calculateTotalRevenue = () => {
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);

  revenueBreakdownData.value = {
    labels: ['Total Revenue'],
    datasets: [
      {
        label: 'Revenue',
        data: [totalRevenue],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
};

// Calculate sales over time
const calculateSalesOverTime = () => {
  const salesByDate = orders.reduce((acc, order) => {
    const date = dayjs(order.date).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += order.amount;
    return acc;
  }, {});

  salesData.value = {
    labels: Object.keys(salesByDate),
    datasets: [
      {
        label: 'Sales Over Time',
        data: Object.values(salesByDate),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
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


const fetchTractorsData = async () => {
  dataLoading.value = true;
  await getAllTractors({
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


<template>

</template>
