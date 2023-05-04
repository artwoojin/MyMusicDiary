import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { UserData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";
import defaultProfile from "../../assets/images/defaultProfile.png";
import Modal from "../common/Modal";

const MyInfoContainer = styled.div`
  display: flex;

  @media screen and (max-width: 721px) {
    flex-direction: column;
  }
`;

const MyProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 5px 0 5px;
  /* border: 1px solid red; */

  // 722px 이상에서 우측 margin 적용
  @media screen and (min-width: 722px) {
    margin-right: 70px;
  }
`;

const MyEditContainer = styled.div`
  width: 100%;
  /* border: 1px solid blue; */
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-bottom: 20px;

  // 721px 이하에서 프로필 이미지 크기 축소
  @media screen and (max-width: 721px) {
    width: 120px;
    height: 120px;
  }
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgSubmitBtn = styled.button`
  width: 150px;
  height: 35px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.signature};
  color: ${(props) => props.theme.color.signatureText};
  font-weight: ${(props) => props.theme.font.titleWeight};
  border: none;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.signatureHover};
  }
`;

const ImgDeleteBtn = styled.button`
  width: 150px;
  height: 35px;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  font-weight: ${(props) => props.theme.font.titleWeight};
  border: none;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

const NicknameContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 0 5px 0 5px;
  font-size: ${(props) => props.theme.font.diaryContentSize};
`;

const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const NicknameInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* border: 1px solid green; */

  > .editNicknameArea {
    max-width: 200px;
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

  > .nicknameArea {
    display: flex;
    align-items: center;
    max-width: 200px;
    height: 30px;
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.titleWeight};
    /* border: 1px solid pink; */
  }
`;

const EditNicknameBtn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  margin-left: 10px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.signature};
  font-weight: ${(props) => props.theme.font.titleWeight};
  color: ${(props) => props.theme.color.signatureText};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.signatureHover};
  }
`;

const PasswordContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 0 5px 0 5px;
`;

const PasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  > .passwordTitle {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.mainText};
    min-width: 185px;
    height: 30px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .editPasswordBtn {
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.signature};
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.signatureText};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.color.signatureHover};
    }
  }
`;

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
  height: 408px;
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
  margin: 30px 0 35px 0;

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

const MyWithdrawalContainer = styled.div`
  font-size: 15px;
  padding: 0 5px 0 5px;
`;

const MyWithdrawalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  > .withdrawalTitle {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.mainText};
    min-width: 185px;
    height: 30px;
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

const WarningText = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.color.thirdText};
  margin-bottom: 15px;
  word-break: keep-all;
`;

export interface UserDataProps {
  list: UserData;
  getUserData: React.Dispatch<React.SetStateAction<object>>;
}

function MyInfo({ list, getUserData }: UserDataProps) {
  const [nickname, setNickname] = useState<string>(list.nickname);
  const [editNickname, setEditNickname] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");
  const [editPasswordModalOpen, setEditPasswordModalOpen] = useState<boolean>(false);
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { currentUser }: any = useContext(MyContext);

  // 프로필 이미지 등록 버튼 클릭 시 ImgInput으로 연결되는 이벤트
  const imageInput = () => {
    fileInput.current?.click();
  };

  // 프로필 이미지 등록 이벤트 핸들러
  const uploadImage = async (e: any) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    await TOKEN_API.post(`/users/${list.userId}/image`, formData);
    window.location.reload();
  };

  // 기본 이미지로 patch 요청
  const deleteImage = async () => {
    await TOKEN_API.delete(`/users/${list.userId}/image`);
    window.location.reload();
  };

  // 유저 닉네임 patch 요청
  const changeNickname = async () => {
    const newNickname = {
      userId: list.userId,
      nickname: nickname,
      // password: list.password,
    };
    const res = await TOKEN_API.patch(`/users/${list.userId}`, newNickname);
    getUserData(res.data);
    currentUser.nickname = nickname;
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
    setEditNickname(false);
  };

  // 유저 닉네임 변경 클릭 이벤트
  const onClickEditButton = () => {
    setEditNickname(!editNickname);
  };

  // 유저 닉네임 변경 체인지 이벤트
  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 유저 패스워드 patch 요청--------------------------------------------------
  const changePassword = async () => {
    if (newPassword === checkNewPassword) {
      const editNewPassword = {
        userId: list.userId,
        nickname: list.nickname,
        password: newPassword,
      };
      const res = await TOKEN_API.patch(`/users/${list.userId}`, editNewPassword);
      getUserData(res.data);
    }
  };
  // 유저 패스워드 patch 요청--------------------------------------------------

  // 유저 패스워드 변경 모달 오픈 이벤트 핸들러
  const openPasswordModalHandler = () => {
    setEditPasswordModalOpen(!editPasswordModalOpen);
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

  const replaceImg = (e: any) => {
    e.target.src = defaultProfile;
  };

  return (
    <MyInfoContainer>
      <MyProfileContainer>
        <ProfileImgWrapper>
          <ProfileImg
            src={list.imageUrl ? list.imageUrl : defaultProfile}
            alt='프로필 이미지'
            onError={replaceImg}
          />
          <ImgInput type='file' accept='image/*' onChange={uploadImage} ref={fileInput} />
          <ImgSubmitBtn onClick={imageInput}>프로필 이미지 등록</ImgSubmitBtn>
          <ImgDeleteBtn onClick={deleteImage}>프로필 이미지 제거</ImgDeleteBtn>
        </ProfileImgWrapper>
      </MyProfileContainer>
      <MyEditContainer>
        <NicknameContainer>
          <NicknameWrapper>
            <NicknameInputWrapper>
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
            </NicknameInputWrapper>
          </NicknameWrapper>
          <WarningText>Mariple에서 사용되는 이름입니다.</WarningText>
        </NicknameContainer>
        <PasswordContainer>
          <PasswordWrapper>
            <div className='passwordTitle'>비밀번호</div>
            <button className='editPasswordBtn' onClick={openPasswordModalHandler}>
              수정
            </button>
            {editPasswordModalOpen ? (
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
                  <button className='CancelButton' onClick={openPasswordModalHandler}>
                    취소
                  </button>
                  <button className='ConfirmButton' onClick={changePassword}>
                    변경
                  </button>
                </EditPasswordModalView>
              </EditPasswordModalBack>
            ) : null}
          </PasswordWrapper>
          <WarningText>로그인 시 사용되는 비밀번호입니다.</WarningText>
        </PasswordContainer>
        <MyWithdrawalContainer>
          <MyWithdrawalWrapper>
            <div className='withdrawalTitle'>회원 탈퇴</div>
            <button className='withdrawalBtn' onClick={openModalHandler}>
              회원 탈퇴
            </button>
            {withDrawalModalOpen ? (
              <Modal
                title={"정말 탈퇴 하시겠습니까?"}
                text={`탈퇴 시 ${nickname}님이 작성한 다이어리 및 댓글이 모두 삭제되며 복구되지 않습니다.`}
                confirmText={"탈퇴"}
                cancelHandler={openModalHandler}
                confirmHandler={withDrawal}
              />
            ) : null}
          </MyWithdrawalWrapper>
          <WarningText>
            탈퇴 시 작성하신 다이어리 및 댓글이 모두 삭제되며 복구되지 않습니다.
          </WarningText>
        </MyWithdrawalContainer>
      </MyEditContainer>
    </MyInfoContainer>
  );
}

export default MyInfo;
