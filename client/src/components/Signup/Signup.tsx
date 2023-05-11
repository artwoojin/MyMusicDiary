import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";
import { toast } from "react-toastify";
import { FormValue } from "../../util/Type";
import logo_black from "../../assets/images/logo_black.png";
import logo_white from "../../assets/images/logo_white.png";
import { useAppSelector } from "../../redux/hooks/hooks";

export const SignContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled.img`
  width: 200px;
  height: 100px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  max-width: 400px;
  min-height: 305px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.inputBackground};
`;

const NicknameInput = styled.input`
  font-size: 14px;
  width: 80vw;
  max-width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-top: 25px;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.background};

  &:focus {
    outline: none;
  }
`;

const EmailInput = styled.input`
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

export const PasswordInput = styled.input`
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

export const SubmitButton = styled.button`
  width: 80vw;
  max-width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.color.signatureText};
  font-size: ${(props) => props.theme.font.diaryContentSize}px;
  font-weight: ${(props) => props.theme.font.titleWeight};
  margin-top: 30px;
  background-color: ${(props) => props.theme.color.signature};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.signatureHover};
  }
`;

export const MovePageButton = styled.button`
  font-size: ${(props) => props.theme.font.diaryContentSize}px;
  margin-top: 25px;
  margin-bottom: 50px;
  width: 90vw;
  max-width: 400px;
  height: 60px;
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.color.mainText};
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.inputBackground};
  cursor: pointer;

  > .bold {
    font-weight: ${(props) => props.theme.font.titleWeight};
  }
`;

export const EmailErrormsg = styled.div`
  margin-top: 6px;
  color: #d0393e;
  font-size: 12px;
`;

export const PasswordErrormsg = styled.div`
  margin-top: 6px;
  margin-bottom: -17px;
  color: #d0393e;
  font-size: 12px;
`;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const modeState = useAppSelector((state) => state.themeReducer.isChange);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    try {
      const signupForm = {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      };
      await BASE_API.post(`/users/sign-up`, signupForm);
      navigate("/login");
      toast.success(`${data.nickname}님 환영합니다!`);
    } catch (err: any) {
      // 500 = 이미 중복된 이메일
      // 400 = 유효한 형식의 이메일이 아닐때(@이가 없을 때, 닉네임이랑 비밀번호가 Null일 때)
      if (err.response.status === 500) toast.error("이미 사용중인 이메일입니다.");
    }
  };

  return (
    <SignContainer>
      <Link to='/'>
        {modeState === "dark" ? <Logo src={logo_white} /> : <Logo src={logo_black} />}
      </Link>
      <FormContainer>
        <NicknameInput
          type='text'
          placeholder='닉네임'
          {...register("nickname", {
            required: "닉네임을 입력해 주세요.",
            maxLength: { value: 10, message: "10자리 이하로 입력해 주세요." },
          })}
        />
        {errors.nickname && <EmailErrormsg>{errors.nickname.message}</EmailErrormsg>}
        <EmailInput
          type='email'
          placeholder='이메일'
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <EmailErrormsg>{errors.email.message}</EmailErrormsg>}
        <PasswordInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
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
        {errors.password && <PasswordErrormsg>{errors.password.message}</PasswordErrormsg>}
        <SubmitButton type='button' onClick={handleSubmit(onSubmit)}>
          가입
        </SubmitButton>
      </FormContainer>
      <Link to='/login'>
        <MovePageButton>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </MovePageButton>
      </Link>
    </SignContainer>
  );
}

export default Signup;
