import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";
import { toast } from "react-toastify";
import { FormValue } from "../../util/Type";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-weight: ${(props) => props.theme.font.logoWeight};
  font-size: 25px;
  margin: 0 15px 30px 15px;

  a {
    color: ${(props) => props.theme.color.logo};
    text-decoration: none;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  max-width: 400px;
  height: 250px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.inputBackground};
`;

const EmailInput = styled.input`
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

const PasswordInput = styled.input`
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

const LoginButton = styled.button`
  width: 80vw;
  max-width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
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

// const PasswordFind = styled.div`
//   margin-top: 23px;
//   color: ${(props) => props.theme.color.mainText};
//   font-size: 13px;
//   cursor: pointer;
// `;

const MoveSignup = styled.button`
  font-size: ${(props) => props.theme.font.diaryContentSize}px;
  margin-top: 20px;
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

const Errormsg = styled.div`
  margin-top: 5px;
  color: #d0393e;
  font-size: 12px;
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    try {
      const loginForm = {
        email: data.email,
        password: data.password,
      };
      const res = await BASE_API.post(`/auth/login`, loginForm);
      if (res.headers.authorization) {
        localStorage.setItem("accessToken", res.headers.authorization);
        localStorage.setItem("CURRENT_USER", JSON.stringify(res.data));
      }
      navigate("/");
      window.location.reload();
    } catch (err: any) {
      // 401 = 이메일 or 비밀번호를 잘못 입력했을 때
      if (err.response?.status === 401) toast.error("입력하신 내용을 다시 확인해주세요.");
    }
  };

  return (
    <LoginContainer>
      <Logo>
        <Link to='/'>나만의 작은 음악 다이어리</Link>
      </Logo>
      <FormContainer>
        <EmailInput
          type='email'
          placeholder='이메일'
          {...register("email", {
            required: "이메일을 입력해 주세요.",
          })}
        />
        {errors.email && <Errormsg>{errors.email.message}</Errormsg>}
        <PasswordInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
          })}
        />
        {errors.password && <Errormsg>{errors.password.message}</Errormsg>}
        <LoginButton onClick={handleSubmit(onSubmit)}>로그인</LoginButton>
      </FormContainer>
      {/* <PasswordFind>비밀번호를 잊으셨나요?</PasswordFind> */}
      <Link to='/Signup'>
        <MoveSignup>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </MoveSignup>
      </Link>
    </LoginContainer>
  );
}

export default Login;
