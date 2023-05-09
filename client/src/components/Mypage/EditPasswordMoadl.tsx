import styled from "styled-components";
import { useState } from "react";
import { TOKEN_API } from "../../util/API";
import { UserData } from "../../util/Type";

const EditPasswordModalBack = styled.div`
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

const EditPasswordModalView = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.background};
  width: 85vw;
  max-width: 400px;
  height: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .passwordModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: left;
    padding-left: 10px;
    margin: 30px 15px 15px 15px;
  }

  > .passwordSubTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: 14px;
    font-weight: ${(props) => props.theme.font.contentWeight};
    text-align: left;
    padding-left: 10px;
    margin: 10px 15px 10px 15px;

    > .red {
      color: #ec1d36;
    }
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
    color: #5d9c59;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-left: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-right-radius: 4px;
  }
`;

const PasswordInputWrapper = styled.div`
  margin: 30px 0 27px 0;

  > .editPasswordInput {
    font-size: 14px;
    width: 75vw;
    max-width: 350px;
    height: 50px;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px 8px 10px 8px;
    color: ${(props) => props.theme.color.mainText};
    border: none;
    border: 1px solid ${(props) => props.theme.color.loginBorderLine};
    background-color: ${(props) => props.theme.color.background};

    &:focus {
      outline: none;
    }
  }
`;

interface UserDataModalProps {
  list: UserData;
  closePasswordModalHandler: () => void;
}

function EditPasswordMoald({ list, closePasswordModalHandler }: UserDataModalProps) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");

  // 유저 패스워드 patch 요청
  const changePassword = async () => {
    if (newPassword === checkNewPassword) {
      const editNewPassword = {
        userId: list.userId,
        nickname: list.nickname,
        password: newPassword,
      };
      await TOKEN_API.patch(`/users/${list.userId}`, editNewPassword);
    }
  };

  // 유저 현재 패스워드 변경 체인지 이벤트
  const onChangeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  // 유저 새 패스워드 변경 체인지 이벤트
  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  // 유저 새 패스워드 확인 변경 체인지 이벤트
  const onChangeCheckNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNewPassword(e.target.value);
  };

  return (
    <>
      <EditPasswordModalBack>
        <EditPasswordModalView>
          <div className='passwordModalTitle'>비밀번호 변경</div>
          <div className='passwordSubTitle'>
            <span className='red'>다른 아이디/사이트에서 사용한 적 없는 비밀번호 </span>
          </div>
          <div className='passwordSubTitle'>
            <span className='red'>이전에 사용한 적 없는 비밀번호</span>가 안전합니다.
          </div>
          <PasswordInputWrapper>
            <input
              className='editPasswordInput'
              type='text'
              placeholder='현재 비밀번호'
              value={currentPassword}
              onChange={onChangeCurrentPassword}
            ></input>
            <input
              className='editPasswordInput'
              type='text'
              placeholder='새 비밀번호'
              value={newPassword}
              onChange={onChangeNewPassword}
            ></input>
            <input
              className='editPasswordInput'
              type='text'
              placeholder='새 비밀번호 확인'
              value={checkNewPassword}
              onChange={onChangeCheckNewPassword}
            ></input>
          </PasswordInputWrapper>
          <button className='CancelButton' onClick={closePasswordModalHandler}>
            취소
          </button>
          <button className='ConfirmButton' onClick={changePassword}>
            변경
          </button>
        </EditPasswordModalView>
      </EditPasswordModalBack>
    </>
  );
}

export default EditPasswordMoald;
