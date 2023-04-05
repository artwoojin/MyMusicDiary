import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";
import { toast } from "react-toastify";
import { FormValue } from "../../util/Type";

const SingupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 27px;
  margin-bottom: 30px;

  a {
    color: ${(props) => props.theme.logo};
    text-decoration: none;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 410px;
  height: 305px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
`;

const NicknameInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const EmailInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const PasswordInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-top: 10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const SignupButton = styled.button`
  width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: #1c1a16;
  font-size: 15px;
  font-weight: 700;
  margin-top: 30px;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const MoveLogin = styled.button`
  font-size: 14px;
  margin-top: 20px;
  width: 410px;
  height: 60px;
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.mainText};
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
  cursor: pointer;

  > .bold {
    font-weight: 500;
  }
`;

const Errormsg = styled.div`
  margin-top: 5px;
  color: #d0393e;
  font-size: 12px;
`;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    BASE_API.post(`/users/sign-up`, {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        navigate("/login");
        toast.success(`${data.nickname}님 환영합니다!`);
      })
      .catch((err) => {
        // 500 = 이미 중복된 이메일
        // 400 = 유효한 형식의 이메일이 아닐때(@이가 없을 때, 닉네임이랑 비밀번호가 Null일 때)
        if (err.response.status === 500) toast.error("이미 사용중인 이메일입니다.");
      });
  };

  return (
    <SingupContainer>
      <Logo>
        <Link to='/'>나만의 작은 음악 다이어리</Link>
      </Logo>
      <FormContainer>
        <NicknameInput placeholder='닉네임' {...register("nickname")} />
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
        {errors.email && <Errormsg>{errors.email.message}</Errormsg>}
        <PasswordInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 4,
              message: "8자리 이상 입력해 주세요.",
            },
          })}
        />
        {errors.password && <Errormsg>{errors.password.message}</Errormsg>}
        <SignupButton type='button' onClick={handleSubmit(onSubmit)}>
          가입
        </SignupButton>
      </FormContainer>
      <Link to='/login'>
        <MoveLogin>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </MoveLogin>
      </Link>
    </SingupContainer>
  );
}

export default Signup;
