import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../constants/favoriteConstants";

export const addToFavorites = (product) => (dispatch, getState) => {
  console.log("addToFavorites action triggered");
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    },
  });
  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(getState().favorites.favoriteItems)
  );
};

export const removeFromFavorites = (productId) => (dispatch, getState) => {
  console.log("removeFromFavorites action triggered");
  dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(getState().favorites.favoriteItems)
  );
};



// import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../constants/favoriteConstants";

// // Other actions...

// export const toggleFavorite = (product) => async (dispatch, getState) => {
//   try {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
//       },
//     };

//     const response = await axios.post(
//       `${API_URL}/api/toggle-favorite/${product._id}/`,
//       {},
//       config
//     );

//     dispatch({
//       type: ADD_TO_FAVORITES,
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log("Error toggling favorite:", error);
//   }
// };
