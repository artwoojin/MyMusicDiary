import styled from "styled-components";
import { ModalValue } from "../../util/interface";

const ModalBack = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.background};
  width: 85vw;
  max-width: 400px;
  height: 210px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .ModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 35px 15px 6px 15px;
  }

  > .ModalTextBody {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    margin-bottom: 6px;
    /* border: 1px solid red; */

    > .ModalText {
      color: ${(props) => props.theme.color.subText};
      font-size: ${(props) => props.theme.font.diaryContentSize}px;
      font-weight: ${(props) => props.theme.font.contentWeight};
      padding: 0 10px 0 10px;
      word-break: keep-all;
      /* border: 1px solid red; */
    }
  }
`;

const ButtonArea = styled.div`
  display: flex;

  > button {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    width: 50%;
    height: 50px;
    border: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
      /* background-color: red; */
    }
  }

  > .CancelButton {
    color: ${(props) => props.theme.color.subText};
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-right: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-left-radius: 4px;
  }

  > .ConfirmButton {
    color: #ec1d36;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-left: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-right-radius: 4px;
  }
`;

function Modal({ title, text, confirmText, cancelHandler, confirmHandler }: ModalValue) {
  return (
    <ModalBack>
      <ModalView>
        <div className='ModalTitle'>{title}</div>
        <div className='ModalTextBody'>
          <div className='ModalText'>{text}</div>
        </div>
        <ButtonArea>
          <button className='CancelButton' onClick={cancelHandler}>
            취소
          </button>
          <button className='ConfirmButton' onClick={confirmHandler}>
            {confirmText}
          </button>
        </ButtonArea>
      </ModalView>
    </ModalBack>
  );
}

export default Modal;
