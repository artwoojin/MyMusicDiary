import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { UserData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import defaultProfile from "../../util/img/defaultProfile.png";

const MyInfoContainer = styled.div`
  display: flex;
  width: 100vw;
  max-width: 900px;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.color.borderLine};
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 0 20px 20px 0;
  cursor: pointer;

  &:hover {
    outline: 5px solid ${(props) => props.theme.color.signature};
  }
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgSubmitBtn = styled.button`
  width: 140px;
  height: 35px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.signature};
  color: ${(props) => props.theme.color.signatureText};
  font-weight: ${(props) => props.theme.font.titleWeight};
  border: none;
  margin: 0 25px 5px 0;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.signatureHover};
  }
`;

const ImgDeleteBtn = styled.button`
  width: 140px;
  height: 35px;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  font-weight: ${(props) => props.theme.font.titleWeight};
  border: none;
  margin: 0 25px 0 0;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

const NickNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
  margin: 0 20px 0 20px;

  > .editNicknameArea {
    width: 90%;
    font-size: 25px;
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.titleWeight};
    border: none;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    background-color: ${(props) => props.theme.color.inputBackground};
    border-radius: 4px;
    padding: 10px 8px 10px 8px;

    &:focus {
      outline: none;
    }
  }

  > .nicknameArea {
    color: ${(props) => props.theme.color.mainText};
    width: 100%;
    font-size: 30px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }
`;

const EditNicknameBtn = styled.button`
  color: ${(props) => props.theme.color.mainText};
  width: 40px;
  margin-top: 10px;
  border: none;
  text-align: left;
  background-color: transparent;
  text-decoration: underline;
  font-size: 15px;
  font-weight: ${(props) => props.theme.font.titleWeight};
  cursor: pointer;
`;

const MySettingContainer = styled.div`
  margin-top: 30px;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
`;

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px 0 10px;
  font-size: 15px;

  > .passwordTitle {
    display: flex;
    align-items: center;
    height: 30px;
    color: ${(props) => props.theme.color.mainText};
    width: 140px;
    margin-right: 85px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .editPasswordArea {
    width: 100%;
    color: ${(props) => props.theme.color.mainText};
    border-radius: 4px;
    padding: 10px 8px 10px 8px;
    border: none;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    background-color: ${(props) => props.theme.color.inputBackground};

    &:focus {
      outline: none;
    }
  }

  > .passwordArea {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    color: ${(props) => props.theme.color.mainText};
  }
`;

const EditPasswordBtn = styled.button`
  color: ${(props) => props.theme.color.mainText};
  width: 100px;
  height: 30px;
  margin-left: 10px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-size: 15px;
  font-weight: ${(props) => props.theme.font.titleWeight};
  cursor: pointer;
`;

const MyWithdrawalContainer = styled.div`
  /* border-bottom: 1px solid ${(props) => props.theme.color.borderLine}; */
`;

const MyWithdrawalWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px 0 10px;
  font-size: 15px;

  > .withdrawalTitle {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.mainText};
    width: 98px;
    height: 30px;
    margin-right: 85px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .withdrawalBtn {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #ff6b6c;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #ec1d36;
    }
  }
`;

const WithdrawalModalBack = styled.div`
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

const WithdrawalModalView = styled.div`
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.background};
  width: 430px;
  height: 220px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .deleteModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: 20px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 30px 0 35px 0;
  }

  > .warningText {
    color: ${(props) => props.theme.color.subText};
    font-weight: ${(props) => props.theme.font.contentWeight};
    font-size: 15px;
    margin-bottom: 41.5px;
  }

  > button {
    font-weight: ${(props) => props.theme.font.titleWeight};
    width: 215px;
    height: 50px;
    color: white;
    border: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  > .deleteCancelButton {
    color: ${(props) => props.theme.color.subText};
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-right: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-left-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }

  > .deleteButton {
    color: #ec1d36;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-left: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-right-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }
`;

const WarningText = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.color.thirdText};
  margin: 0 0 15px 10px;
`;

export interface UserDataProps {
  list: UserData;
  getUserData: React.Dispatch<React.SetStateAction<object>>;
}

function MyInfo({ list, getUserData }: UserDataProps) {
  const [image, setImage] = useState(list.imageUrl);
  const [nickname, setNickname] = useState<string>(list.nickname);
  const [editNickname, setEditNickname] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(list.password);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 프로필 이미지 클릭 시 input으로 연결되는 이벤트
  const clickProfile = () => {
    fileInput.current?.click();
  };

  // 선택한 이미지 미리보기 이벤트
  const saveImage = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // 선택한 이미지 patch 요청
  const changeImage = async () => {
    const newImg = {
      imageUrl: image,
      nickname: list.nickname,
      password: list.password,
    };
    await TOKEN_API.patch(`/users/${list.userId}`, newImg);
    window.location.reload();
  };

  // 기본 이미지로 patch 요청
  const deleteImage = async () => {
    const newImg = {
      imageUrl: defaultProfile,
      nickname: list.nickname,
      password: list.password,
    };
    await TOKEN_API.patch(`/users/${list.userId}`, newImg);
    window.location.reload();
  };

  // 유저 닉네임 patch 요청
  const changeNickname = async () => {
    const newNickname = {
      userId: list.userId,
      nickname: nickname,
      password: list.password,
    };
    const res = await TOKEN_API.patch(`/users/${list.userId}`, newNickname);
    getUserData(res.data);
    setEditNickname(false);
  };

  // 유저 패스워드 patch 요청
  const changePassword = async () => {
    const newPassword = {
      userId: list.userId,
      nickname: list.nickname,
      password: password,
    };
    const res = await TOKEN_API.patch(`/users/${list.userId}`, newPassword);
    getUserData(res.data);
    setEditPassword(false);
  };

  // 유저 닉네임 변경 클릭 이벤트
  const onClickEditButton = () => {
    setEditNickname(!editNickname);
  };

  // 유저 패스워드 변경 클릭 이벤트
  const onClickPasswordButton = () => {
    setEditPassword(!editPassword);
  };

  // 유저 닉네임 변경 체인지 이벤트
  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 유저 패스워드 변경 체인지 이벤트
  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 회원 탈퇴 모달 오픈 이벤트 핸들러
  const openModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
  };

  // 회원 탈퇴 delete 요청
  const withDrawal = async () => {
    await TOKEN_API.delete(`/users/${list.userId}`);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("CURRENT_USER");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <MyInfoContainer>
        <ProfileImgWrapper>
          <ProfileImg
            src={image ? image : defaultProfile}
            alt='프로필 이미지'
            onClick={clickProfile}
          />
          <ImgInput type='file' accept='image/*' onChange={saveImage} ref={fileInput} />
          <ImgSubmitBtn onClick={changeImage}>프로필 이미지 저장</ImgSubmitBtn>
          <ImgDeleteBtn onClick={deleteImage}>프로필 이미지 제거</ImgDeleteBtn>
        </ProfileImgWrapper>
        <NickNameWrapper>
          {editNickname ? (
            <input
              className='editNicknameArea'
              type='text'
              value={nickname}
              onChange={onChangeEditInput}
            ></input>
          ) : (
            <div className='nicknameArea'>{list.nickname}</div>
          )}
          {editNickname ? (
            <EditNicknameBtn onClick={changeNickname}>저장</EditNicknameBtn>
          ) : (
            <EditNicknameBtn onClick={onClickEditButton}>수정</EditNicknameBtn>
          )}
        </NickNameWrapper>
      </MyInfoContainer>
      <MySettingContainer>
        <PasswordWrapper>
          <div className='passwordTitle'>비밀번호</div>
          {editPassword ? (
            <input
              className='editPasswordArea'
              type='text'
              value={password}
              onChange={onChangePasswordInput}
            ></input>
          ) : (
            <div className='passwordArea'>********</div>
          )}
          {editPassword ? (
            <EditPasswordBtn onClick={changePassword}>저장</EditPasswordBtn>
          ) : (
            <EditPasswordBtn onClick={onClickPasswordButton}>수정</EditPasswordBtn>
          )}
        </PasswordWrapper>
        <WarningText>로그인 시 사용되는 비밀번호입니다.</WarningText>
      </MySettingContainer>
      <MyWithdrawalContainer>
        <MyWithdrawalWrapper>
          <div className='withdrawalTitle'>회원 탈퇴</div>
          <button className='withdrawalBtn' onClick={openModalHandler}>
            회원 탈퇴
          </button>
          {withDrawalModalOpen ? (
            <WithdrawalModalBack>
              <WithdrawalModalView>
                <div className='deleteModalTitle'>정말 탈퇴 하시겠습니까?</div>
                <div className='warningText'>
                  탈퇴 시 작성하신 다이어리 및 댓글이 모두 삭제되며
                  <br />
                  복구되지 않습니다.
                </div>
                <button className='deleteCancelButton' onClick={openModalHandler}>
                  취소
                </button>
                <button className='deleteButton' onClick={withDrawal}>
                  탈퇴
                </button>
              </WithdrawalModalView>
            </WithdrawalModalBack>
          ) : null}
        </MyWithdrawalWrapper>
        <WarningText>
          탈퇴 시 작성하신 다이어리 및 댓글이 모두 삭제되며 복구되지 않습니다.
        </WarningText>
      </MyWithdrawalContainer>
    </>
  );
}

export default MyInfo;
