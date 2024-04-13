// darkModeActions.js
import {
    TOGGLE_DARK_MODE,
  } from "../constants/darkModeConstants";

export const toggleDarkMode = () => (dispatch, getState) => {
    // You can save the dark mode preference in local storage or Redux store
    const isDarkMode = getState().isDarkMode;
    localStorage.setItem('darkMode', !isDarkMode);
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };
  

  
//   export default darkModeReducer;
  