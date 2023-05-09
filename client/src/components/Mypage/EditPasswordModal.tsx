import styled from "styled-components";
import { TOKEN_API } from "../../util/API";
import { UserData } from "../../util/Type";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordValue } from "../../util/Type";

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
  min-height: 400px;
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
  margin: 30px 0 37px 0;
`;

const CurrentPasswordInput = styled.input`
  font-size: 14px;
  width: 80vw;
  max-width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.background};

  &:focus {
    outline: none;
  }
`;

const NewPasswordInput = styled.input`
  font-size: 14px;
  width: 80vw;
  max-width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-top: 10px;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.background};

  &:focus {
    outline: none;
  }
`;

const CheckNewPasswordInput = styled.input`
  font-size: 14px;
  width: 80vw;
  max-width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-top: 10px;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.background};

  &:focus {
    outline: none;
  }
`;

const PasswordErrormsg = styled.div`
  margin-top: 6px;
  color: #d0393e;
  font-size: 12px;
`;

interface UserDataModalProps {
  list: UserData;
  closePasswordModalHandler: () => void;
}

function EditPasswordModal({ list, closePasswordModalHandler }: UserDataModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordValue>();

  // 유저 패스워드 patch 요청
  const changePassword: SubmitHandler<PasswordValue> = async (data) => {
    try {
      if (data.newPassword === data.checkNewPassword) {
        const editNewPassword = {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        };
        await TOKEN_API.post(`/users/${list.userId}/change-password`, editNewPassword);
        closePasswordModalHandler();
        toast.success(`비밀번호가 변경되었습니다.`);
      } else if (data.newPassword !== data.checkNewPassword) {
        toast.error("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      }
    } catch (err: any) {
      if (err.response?.status === 500) {
        toast.error("현재 비밀번호가 올바르지 않습니다.");
      }
    }
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
            <CurrentPasswordInput
              type='password'
              placeholder='현재 비밀번호'
              {...register("currentPassword", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자리 이하로 입력해 주세요.",
                },
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message: "영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                },
              })}
            />
            {errors.currentPassword && (
              <PasswordErrormsg>{errors.currentPassword.message}</PasswordErrormsg>
            )}
            <NewPasswordInput
              type='password'
              placeholder='새 비밀번호'
              {...register("newPassword", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자리 이하로 입력해 주세요.",
                },
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message: "영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                },
              })}
            />
            {errors.newPassword && (
              <PasswordErrormsg>{errors.newPassword.message}</PasswordErrormsg>
            )}
            <CheckNewPasswordInput
              type='password'
              placeholder='새 비밀번호 확인'
              {...register("checkNewPassword", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자리 이하로 입력해 주세요.",
                },
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message: "영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                },
              })}
            />
            {errors.checkNewPassword && (
              <PasswordErrormsg>{errors.checkNewPassword.message}</PasswordErrormsg>
            )}
          </PasswordInputWrapper>
          <button className='CancelButton' onClick={closePasswordModalHandler}>
            취소
          </button>
          <button className='ConfirmButton' onClick={handleSubmit(changePassword)}>
            변경
          </button>
        </EditPasswordModalView>
      </EditPasswordModalBack>
    </>
  );
}

export default EditPasswordModal;
