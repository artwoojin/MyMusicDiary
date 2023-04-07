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
    signatureHover: `#F8EAD8`,
    signatureText: `#22262c`,

    borderLine: `#f0f0f0`,
    inputBackground: `white`,

    buttonHover: `#f1f3f5`,

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

    buttonHover: `#3C4048`,

    pageDisabled: `gray`,
  },

  font: {
    logoWeight: 700,
    titleWeight: 600,
    contentWeight: 500,
  },
};
