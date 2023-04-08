import { createContext } from "react";
import { DefaultTheme } from "styled-components";

export const myContext: any = createContext(null);

// #8c8c8c

export const lightMode: DefaultTheme = {
  color: {
    logo: `#22262c`,
    background: `white`,

    mainText: `#22262c`,
    subText: `#495057`,
    thirdText: `#9aa1a8`,

    signature: `#ffefd5`,
    signatureHover: `#ffdeb7`,
    signatureText: `#22262c`,

    borderLine: `#ebebeb`,
    inputBackground: `white`,

    buttonHover: `#f7f7f7`,
    dropDownHover: `#f7f7f7`,

    pageDisabled: `lightgray`,
  },

  font: {
    logoWeight: 700,
    titleWeight: 600,
    contentWeight: 500,
  },
};

export const darkMode: DefaultTheme = {
  color: {
    logo: `#ececec`,
    background: `#121212`,

    mainText: `#ececec`,
    subText: `#a6a6a6`,
    thirdText: `#9aa1a8`,

    signature: `#ffefd5`,
    signatureHover: `#ffdeb7`,
    signatureText: `#22262c`,

    borderLine: `#2a2a2a`,
    inputBackground: `#1e1e1e`,

    buttonHover: `#1e1e1e`,
    dropDownHover: `#2d2d2d`,

    pageDisabled: `gray`,
  },

  font: {
    logoWeight: 700,
    titleWeight: 600,
    contentWeight: 500,
  },
};
