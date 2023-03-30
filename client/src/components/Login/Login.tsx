import spotifylogo from "../../util/img/spotifylogo.png";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { BASE_API } from "../../util/API";

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 288.45px;
  position: relative;
`;

const SpotifyButton = styled.button`
  width: 450px;
  height: 48px;
  border-radius: 50px;
  background: black;
  color: white;
  border: solid 1px #cbcbcbe6;
  position: relative;
  cursor: pointer;
`;

const SignupButton = styled.button`
  width: 450px;
  height: 48px;
  border-radius: 50px;
  background: white;
  font-size: 20px;
  color: black;
  border: solid 1px #cbcbcbe6;
  position: relative;
  cursor: pointer;
`;

const BorderLine = styled.hr`
  width: 450px;
  margin: 30px;
  border: 1px solid gray;
`;

const Form = styled.form`
  width: 450px;
  height: 300px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px #c2c2c2;
  position: relative;
`;

const ImgSrc = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-bottom: -4px;
`;

const EmailText = styled.span`
  width: 100px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 12%;
  left: 8%;
`;
const PassText = styled.span`
  width: 100px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 43%;
  left: 8%;
`;

const EmailInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 21%;
  left: 8%;
`;

const PassInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 53%;
  left: 8%;
`;

const LoginButton = styled.button`
  width: 240.45px;
  height: 37.8px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px #ffffffb1 inset;
  background: gray;
  color: white;
  position: absolute;
  top: 80%;
  left: 22%;
  cursor: pointer;
`;

const UnderText = styled.span`
  width: fit-content;
  height: 32.59px;
  color: #0f79ce;
  font-size: 12.5px;
  position: absolute;
  top: 44%;
  left: 75%;
`;

const LoginWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 25%;
`;

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`;

const Errormsg = styled.p`
  display: block;
  color: #d0393e;
  margin: 2px 0px;
  padding: 2px;
  font-size: 12px;
`;

interface FormValue {
  email: string;
  password: any;
}

const Login = () => {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    BASE_API.post(`/auth/login`, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res);
        if (res.headers.authorization) {
          localStorage.setItem("login-token", res.headers.authorization);
          // localStorage.setItem("login-refresh", res.headers.refresh);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("nickname", res.data.nickname);
        }
        setLoginError(false);
      })
      .then(() => {
        navigate("/");
        // 왜 새로고침이 필요한지?
        window.location.reload();
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  return (
    <LoginContainer onSubmit={handleSubmit(onSubmit)}>
      <LoginWrapper>
        <Buttons>
          <SpotifyButton>
            <ImgSrc src={spotifylogo} />
            Spotify로 계속하기
          </SpotifyButton>
        </Buttons>
        <BorderLine />
        <Form>
          <EmailText>이메일 주소</EmailText>
          <EmailInput />
          <PassText>비밀번호</PassText>
          <UnderText>비밀번호 찾기</UnderText>
          <PassInput
            type='password'
            id='password'
            {...register("password", {
              required: true,
            })}
          >
            {errors.password && errors.password.type === "required" && (
              <Errormsg>Password cannot be empty.</Errormsg>
            )}
          </PassInput>
          <LoginButton
            type='button'
            onClick={handleSubmit(onSubmit)}
            onSubmit={handleSubmit(onSubmit)}
          >
            로그인
          </LoginButton>
        </Form>
        <BorderLine />
        <div>아직 계정이 없으신가요?</div>
        <SignupButton>
          <Link to='/Signup'>나만의 작은 음악 다이어리 가입하기</Link>
        </SignupButton>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
