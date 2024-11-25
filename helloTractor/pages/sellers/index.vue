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


const fetchTractorsData = async () => {
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
