import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      logo: string;
      background: string;

      mainText: string;
      subText: string;
      thirdText: string;

      signature: string;
      signatureHover: string;
      signatureText: string;

      borderLine: string;
      inputBackground: string;

      buttonHover: string;
      dropDownHover: string;

      pageDisabled: string;
    };

    font: {
      diaryMainTitleSize: number;
      diarySubTitleSize: number;
      diaryContentSize: number;

      logoWeight: number;
      titleWeight: number;
      contentWeight: number;
    };
  }
}
