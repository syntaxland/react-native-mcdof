import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../constants/favoriteConstants";

export const favoriteReducer = (state = { favoriteItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const item = action.payload;
      const existItem = state.favoriteItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          favoriteItems: state.favoriteItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return { ...state, favoriteItems: [...state.favoriteItems, item] };
      }
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter((x) => x._id !== action.payload),
      };
    default:
      return state;
  }
};


// import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../constants/favoriteConstants";

// const initialState = {
//   favoriteItems: [],
// };

// export const favoriteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_FAVORITES:
//       return {
//         ...state,
//         favoriteItems: [...state.favoriteItems, action.payload],
//       };
//     case REMOVE_FROM_FAVORITES:
//       return {
//         ...state,
//         favoriteItems: state.favoriteItems.filter(
//           (item) => item._id !== action.payload
//         ),
//       };
//     default:
//       return state;
//   }
// };
