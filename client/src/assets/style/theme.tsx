import { DefaultTheme } from "styled-components";

// #ffefd5

export const lightMode: DefaultTheme = {
  color: {
    logo: `#22262c`,
    background: `white`,

    mainText: `#22262c`,
    subText: `#495057`,
    thirdText: `#9aa1a8`,
    tagText: `#495057`,

    signature: `#ffefd5`,
    signatureHover: `#ffdeb7`,
    signatureText: `#22262c`,

    userAreaLine: `#f1f3f5`,
    borderLine: `#ebebeb`,
    inputBackground: `white`,
    loginBorderLine: `#dbdbdb`,

    buttonHover: `#f7f7f7`,
    dropDownHover: `#f7f7f7`,

    pageDisabled: `lightgray`,
  },

  font: {
    diaryMainTitleSize: 21,
    diarySubTitleSize: 18,
    diaryContentSize: 15,

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
    tagText: `#d4d4d4`,

    signature: `#ffefd5`,
    signatureHover: `#ffdeb7`,
    signatureText: `#22262c`,

    userAreaLine: `#2a2a2a`,
    borderLine: `#2a2a2a`,
    inputBackground: `#1e1e1e`,
    loginBorderLine: `#2a2a2a`,

    buttonHover: `#1e1e1e`,
    dropDownHover: `#2d2d2d`,

    pageDisabled: `gray`,
  },

  font: {
    diaryMainTitleSize: 21,
    diarySubTitleSize: 18,
    diaryContentSize: 15,

    logoWeight: 700,
    titleWeight: 600,
    contentWeight: 500,
  },
};
