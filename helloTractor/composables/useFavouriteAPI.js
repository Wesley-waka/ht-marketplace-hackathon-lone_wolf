// import { useAuthStore } from '@/stores/authStore'

// import auth from "~/middleware/auth";

export const useFavouriteAPI = (user_id) => {
  console.log(user_id, 'user_id')
  const getFavourite = async () => {
    return await useCustomFetch(`/auth/users/${user_id}/favoriteProducts`, {
      method: "GET",
    });
  };

  const addToFavourite = async (productId) => {
    const data = {
      productID: productId,
    };
    return await useCustomFetch(`/auth/users/${user_id}/favoriteProducts`, {
      method: "POST",
      body: data,
    });
  };

  const deleteFavourite = async (productId) => {
    return await useCustomFetch(`/auth/users/${user_id}/favoriteProducts/${productId}`, {
      method: "DELETE",
    });
  };

  const clearFavourite = async () => {
    return await useCustomFetch(`/auth/users/${user_id}/favoriteProducts`, {
      method: "DELETE",
    });
  };

  return {
    getFavourite,
    addToFavourite,
    deleteFavourite,
    clearFavourite
  };
};