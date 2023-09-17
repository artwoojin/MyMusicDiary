import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { UserData } from "../../util/type";
import { TOKEN_API } from "../../util/api";
import defaultProfile from "../../assets/images/defaultProfile.png";
import Modal from "../common/Modal";
import EditPasswordModal from "./EditPasswordModal";
import { VscSignOut } from "react-icons/vsc";
import { FiUserCheck } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useAppSelector } from "../../redux/hooks/hooks";

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

  // 722px 이상에서 우측 margin 적용
  @media screen and (min-width: 722px) {
    margin-right: 70px;
  }
`;

const MyEditContainer = styled.div`
  width: 100%;
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
  justify-content: center;
  height: 50px;

  > .nicknameIcon {
    margin-left: 4px;
    margin-right: 9px;
    color: ${(props) => props.theme.color.mainText};
  }
`;

const NicknameInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > .editNicknameArea {
    width: 220px;
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.contentWeight};
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
    width: 220px;
    height: 30px;
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.titleWeight};
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

const PasswordTitle = styled.div`
  display: flex;
  align-items: center;

  > .passwordTitle {
    font-size: 15px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.mainText};
    min-width: 185px;
    height: 30px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .passwordIcon {
    margin-right: 12px;
    color: ${(props) => props.theme.color.mainText};
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
    width: 90px;
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

const WithdrawalTitle = styled.div`
  display: flex;
  align-items: center;

  > .withdrawalTitle {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.mainText};
    min-width: 185px;
    height: 30px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .withdrawalIcon {
    margin-right: 12px;
    color: ${(props) => props.theme.color.mainText};
  }
`;

const WarningText = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.color.thirdText};
  margin-bottom: 15px;
  word-break: keep-all;
`;

interface UserDataProps {
  list: UserData;
  getUserData: React.Dispatch<React.SetStateAction<object>>;
}

function MyInfo({ list, getUserData }: UserDataProps) {
  const [nickname, setNickname] = useState<string>(list.nickname);
  const [editNickname, setEditNickname] = useState<boolean>(false);
  const [editPasswordModalOpen, setEditPasswordModalOpen] = useState<boolean>(false);
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const currentUserInfo = useAppSelector((state) => state.loginReducer.currentUserInfo);

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
    };
    const res = await TOKEN_API.patch(`/users/${list.userId}`, newNickname);
    getUserData(res.data);
    const currentUserInfoCopy = { ...currentUserInfo };
    currentUserInfoCopy.nickname = nickname;
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUserInfoCopy));
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

  // 유저 패스워드 변경 모달 오픈 이벤트 핸들러
  const openPasswordModalHandler = () => {
    setEditPasswordModalOpen(!editPasswordModalOpen);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 유저 패스워드 변경 모달 클로즈 이벤트 핸들러
  const closePasswordModalHandler = () => {
    setEditPasswordModalOpen(!editPasswordModalOpen);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  // 회원 탈퇴 모달 오픈 이벤트 핸들러
  const openWithdrawalModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 회원 탈퇴 모달 클로즈 이벤트 핸들러
  const closeWithdrawalModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
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
            <FiUserCheck className='nicknameIcon' size={20} />
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
            <PasswordTitle>
              <HiOutlineLockClosed className='passwordIcon' size={20} />
              <div className='passwordTitle'>비밀번호</div>
            </PasswordTitle>
            <button className='editPasswordBtn' onClick={openPasswordModalHandler}>
              수정
            </button>
            {editPasswordModalOpen ? (
              <EditPasswordModal
                list={list}
                closePasswordModalHandler={closePasswordModalHandler}
              />
            ) : null}
          </PasswordWrapper>
          <WarningText>로그인 시 사용되는 비밀번호입니다.</WarningText>
        </PasswordContainer>
        <MyWithdrawalContainer>
          <MyWithdrawalWrapper>
            <WithdrawalTitle>
              <VscSignOut className='withdrawalIcon' size={20} />
              <div className='withdrawalTitle'>회원탈퇴</div>
            </WithdrawalTitle>
            <button className='withdrawalBtn' onClick={openWithdrawalModalHandler}>
              회원탈퇴
            </button>
            {withDrawalModalOpen ? (
              <Modal
                title={"정말 탈퇴 하시겠습니까?"}
                text={`탈퇴 시 ${nickname}님이 작성한 다이어리 및 댓글이 모두 삭제되며 복구되지 않습니다.`}
                confirmText={"탈퇴"}
                cancelHandler={closeWithdrawalModalHandler}
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
