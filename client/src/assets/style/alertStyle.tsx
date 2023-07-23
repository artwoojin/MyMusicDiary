import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const ToastAlert = styled(ToastContainer)`
  .Toastify__toast {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    color: ${(props) => props.theme.color.mainText};
    background-color: ${(props) => props.theme.color.inputBackground};
  }

  .Toastify__close-button {
    color: ${(props) => props.theme.color.mainText};
  }
`;
