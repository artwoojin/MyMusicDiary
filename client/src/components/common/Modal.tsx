import styled from "styled-components";

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
  text-align: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.background};
  width: 85vw;
  max-width: 400px;
  height: 200px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .ModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 30px 15px 30px 15px;
  }

  > .ModalText {
    height: 45px;
    color: ${(props) => props.theme.color.subText};
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    font-weight: ${(props) => props.theme.font.contentWeight};
    margin: 0 15px 22px 15px;
    word-break: keep-all;
  }

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

function Modal({ title, text, confirmText, cancelHandler, confirmHandler }: any) {
  return (
    <ModalBack>
      <ModalView>
        <div className='ModalTitle'>{title}</div>
        <div className='ModalText'>{text}</div>
        <button className='CancelButton' onClick={cancelHandler}>
          취소
        </button>
        <button className='ConfirmButton' onClick={confirmHandler}>
          {confirmText}
        </button>
      </ModalView>
    </ModalBack>
  );
}

export default Modal;
