// DarkModeScreen.js
import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleDarkMode } from "../../actions/darkModeActions";
import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { styled, createGlobalStyle} from "styled-components"

const DarkModeScreen = () => {
  // const dispatch = useDispatch();
  //   const isDarkMode = useSelector((state) => state.isDarkMode);

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

//   const handleDarkModeToggle = () => {
//     dispatch(toggleDarkMode());
//   };

    const defaultProperties = {
      dark: {
        circle: {
          r: 9,
        },
        mask: {
          cx: '50%',
          cy: '23%',
        },
        svg: {
          transform: 'rotate(40deg)',
        },
        lines: {
          opacity: 0,
        },
      },
      light: {
        circle: {
          r: 5,
        },
        mask: {
          cx: '100%',
          cy: '0%',
        },
        svg: {
          transform: 'rotate(90deg)',
        },
        lines: {
          opacity: 1,
        },
      },
      springConfig: { mass: 4, tension: 250, friction: 35 },
    };

  return (
    <>
      <div className="d-flex justify-content-end">
        <span>Dark Mode</span>
        <DarkModeSwitch
          style={{ marginBottom: "2rem" }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={24}
          animationProperties={defaultProperties}
          sunColor="yellow"
          moonColor="black"
        />
      </div>
      <span>Dark Mode</span>
      <span>Dark Mode</span>
      <span>Dark Mode</span>
      <span>Dark Mode</span>
      <span>Dark Mode</span>
      <span>Dark Mode</span>
      <span>Dark Mode</span>
      <span>Dark Mode</span>

      
    </>
  );
};

export default DarkModeScreen;
