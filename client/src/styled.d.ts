import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      logo: string;
      background: string;
      mainText: string;
      subText: string;
      mainColor: string;
      buttonHover: string;

      // main
      diaryDate: string;
      diaryInfoLine: string;

      TagColor: string;
      disabledTagBorder: string;
      disabledTagBackground: string;
      disabled: string;

      // detail
      detailLine: string;
      likeHover: string;
      commentInputBackground: string;
      playListHover: string;
    };

    font: {
      logoWeight: number;
      titleWeight: number;
      contentWeight: number;
    };
  }
}
