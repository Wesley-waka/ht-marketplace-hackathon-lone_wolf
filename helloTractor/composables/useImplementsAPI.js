export const useImplementsAPI = () => {

  const getAllImplements = async ({ search = '', page = 1, pageSize = 100, sort = '', order = 'asc' }) => {

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

  const getImplementById = async (id) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "GET",
    });
  };

  const createImplement = async (data) => {
    return await useCustomFetch('/products', {
      method: "POST",
      body: data,
    });
  };

  const updateImplement = async (id, data) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "PATCH",
      body: data,
    });
  };

  const deleteImplement = async (id) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "DELETE",
    });
  };

  return {
    getAllImplements,
    getImplementById,
    createImplement,
    updateImplement,
    deleteImplement,
  };
};
