  // darkModeReducer.js
  import {
    TOGGLE_DARK_MODE,

  } from "../constants/darkModeConstants";
  
  const darkModeReducer = (state = false, action) => {
    switch (action.type) {
      case 'TOGGLE_DARK_MODE':
        return !state;
      default:
        return state;
    }
  };
