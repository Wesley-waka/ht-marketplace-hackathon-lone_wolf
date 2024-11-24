export const useTractorsAPI = () => {

  const getAllTractors = async ({ search = '', page = 1, pageSize = 100, sort = '', order = 'asc' }) => {

    let url = '/products?page=' + page + '&limit=' + pageSize;

    if (search) {
      url += `&keyword=${search}`;
    }

    if (sort) {
      if (order === 'asc') {
        url += `&sort=${sort}`;
      }
      else {
        url += `&sort=-${sort}`;
      }
    }

    return await useCustomFetch(url, {
      method: "GET",
    });
  };

  const getTractorById = async (id) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "GET",
    });
  };

  const createTractor = async (data) => {
    return await useCustomFetch('/products', {
      method: "POST",
      body: data,
    });
  };

  const updateTractor = async (id, data) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "PATCH",
      body: data,
    });
  };

  const deleteTractor = async (id) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "DELETE",
    });
  };

  return {
    getAllTractors,
    getTractorById,
    createTractor,
    updateTractor,
    deleteTractor,
  };
};
