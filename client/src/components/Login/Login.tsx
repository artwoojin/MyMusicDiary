import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { BASE_API } from "../../util/API";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  color: ${(props) => props.theme.mainText};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 300px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
`;

const EmailInput = styled.input`
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

const PasswordInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: #1c1a16;
  font-size: 15px;
  font-weight: 700;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  &:hover {
    background-color: #ffdeb7;
  }
`;

const PasswordFind = styled.div`
  position: absolute;
  margin-top: 240px;
  color: ${(props) => props.theme.mainText};
  font-size: 13px;
  cursor: pointer;
`;

const SignupButton = styled.button`
  font-size: 14px;
  margin-top: 20px;
  width: 450px;
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

const Errormsg = styled.p`
  color: #d0393e;
  margin: 2px 0px;
  padding: 2px;
  font-size: 12px;
`;

interface FormValue {
  email: string;
  password: any;
}

function Login() {
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    BASE_API.post(`/auth/login`, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        // console.log(res);
        if (res.headers.authorization) {
          localStorage.setItem("login-token", res.headers.authorization);
          // localStorage.setItem("userId", res.data.userId);
          // localStorage.setItem("login-refresh", res.headers.refresh);
        }
        setLoginError(false);
      })
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  return (
    <LoginContainer>
      <Logo>나만의 작은 음악 다이어리</Logo>
      <FormContainer>
        {errors.email && errors.email.type === "required" && (
          <Errormsg>Email cannot be empty.</Errormsg>
        )}
        {errors.password && errors.password.type === "required" && (
          <Errormsg>Password cannot be empty.</Errormsg>
        )}
        {loginError ? <Errormsg>The email or password is incorrect.</Errormsg> : null}
        <EmailInput
          type='email'
          placeholder='이메일'
          {...register("email", {
            required: true,
          })}
        />
        <PasswordInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
            required: true,
          })}
        />
        <LoginButton type='button' onClick={handleSubmit(onSubmit)}>
          로그인
        </LoginButton>
        <PasswordFind>비밀번호를 잊으셨나요?</PasswordFind>
      </FormContainer>
      <Link to='/Signup'>
        <SignupButton>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </SignupButton>
      </Link>
    </LoginContainer>
  );
}

export default Login;
