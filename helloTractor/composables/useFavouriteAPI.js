export const useCartAPI = () => {

  const getFavourite = async (id) => {
    return await useCustomFetch(`/users/${id}/favoriteProoducts`, {
      method: "GET",
    });
  };

  // const getCartItem = async (productId) => {
  //   return await useCustomFetch(`/cart/${productId}`, {
  //     method: "GET",
  //   });
  // };

  const addToFavourite = async (id, data) => {
    const data = {
      productID: productId,
      // quantity: quantity
    };
    return await useCustomFetch(`/users/${id}/favoriteProducts`, {
      method: "POST",
      body: data,
    });
  };

  // const updateCartItem = async (productId, quantity) => {
  //   return await useCustomFetch(`/cart/${productId}`, {
  //     method: "PATCH",
  //     // body: { quantity },
  //   });
  // };

  const deleteFavourite = async (id, productId) => {
    return await useCustomFetch(`/users/${id}/favoriteProducts/${productId}`, {
      method: "DELETE",
    });
  };

  const clearFavourite = async (id) => {
    return await useCustomFetch(`/users/${id}/favoriteProducts`, {
      method: "DELETE",
    });
  };

  // const applyCoupon = async (data) => {
  //   return await useCustomFetch('/cart/applyCoupon', {
  //     method: "POST",
  //     body: data,
  //   });
  // };

  return {
    getFavourite,
    addToFavourite,
    deleteFavourite,
    clearFavourite
  };
};
