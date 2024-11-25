export const useAuthAPI = () => {

  const getAllUsers = async ({ user = '', isApproved = '', search = '', pageSize = 10 }) => {

    let url = '/users?limit=' + pageSize;

    if (search) {
      url += `&keyword=${search}`;
    }

    if (user) {
      url += `&user=${user}`;
    }

    if (isApproved) {
      url += `&isApproved=${isApproved}`;
    }


    return await useCustomFetch(url, {
      method: "GET",
    });
  };

  const getUserById = async (id) => {
    return await useCustomFetch(`/auth/${id}`, {
      method: "GET",
    });
  };

  const logIn = async (data) => {
    return await useCustomFetch(`/signin`, {
      method: "POST",
      body: data
    });
  };

  const signUp = async (id, data) => {
    return await useCustomFetch(`/auth/signup`, {
      method: "POST",
      body: data
    });
  };

  const googleLogin = async (cartId) => {
    return await useCustomFetch(`/auth/google`, {
      method: "GET",
    });
  };

  const faceBookLogin = async (cartId) => {
    return await useCustomFetch(`/auth/facebook`, {
      method: "GET",
    });
  };


  const updateUser = async (id, data) => {
    return await useCustomFetch(`/auth/users/${id}`, {
      method: "POST",
      body: data
    });
  };

  const approveUser = async (id, data) => {
    return await useCustomFetch(`/auth/users/${id}/toggleApproval`, {
      method: "POST",
      body: data
    });
  };


  const verification = async (data) => {
    return await useCustomFetch(`/auth/verify-2fa`, {
      method: "POST",
      body: data
    });
  };


  const favCreateProducts = async (id, data) => {
    return await useCustomFetch(`/auth/users/${id}/favoriteProducts`, {
      method: "POST",
      body: data
    });
  };

  const favGetProducts = async (id) => {
    return await useCustomFetch(`/auth/users/${id}/favoriteProducts`, {
      method: "GET",
    });
  };


  const logOut = async (id) => {
    return await useCustomFetch(`/auth/logout`, {
      method: "GET",
    });
  };





  return {
    logOut,
    favGetProducts,
    favCreateProducts,
    disApproveUser,
    verification,
    approveUser,
    updateUser,
    faceBookLogin,
    googleLogin,
    logIn,
    getUserById,
    getAllUsers
  };
};
