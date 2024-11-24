export const useAuthAPI = () => {

  const getAllUsers = async ({ search = '', page = 1, pageSize = 100, sort = '', order = 'asc' }) => {

    let url = '/orders?page=' + page + '&limit=' + pageSize;

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

  const getUserById = async (id) => {
    return await useCustomFetch(`/orders/${id}`, {
      method: "GET",
    });
  };

  const logIn = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };

  const signUp = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };

  const googleLogin = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };

  const faceBookLogin = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };


  const logOut = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };

  const updateUser = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };

  const approveUser = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };


  const verification = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };

  const disApproveUser = async (cartId) => {
    return await useCustomFetch(`/orders/${cartId}`, {
      method: "POST",
    });
  };



  return {
    getAllOrders,
    getOrderById,
    createOrder,
    createCheckoutSession,
    updateToPaid,
    updateToDelivered,
    deleteOrder
  };
};
