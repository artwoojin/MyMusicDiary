import styled from "styled-components";
import * as Signup from "../Signup/Signup";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";
import { toast } from "react-toastify";
import { FormValue } from "../../util/Type";
import logo_black from "../../assets/images/logo_black.png";
import logo_white from "../../assets/images/logo_white.png";
import { useAppSelector } from "../../redux/hooks/hooks";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  max-width: 400px;
  min-height: 250px;
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
  margin-top: 25px;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.background};

  &:focus {
    outline: none;
  }
`;

// const PasswordFind = styled.div`
//   margin-top: 23px;
//   color: ${(props) => props.theme.color.mainText};
//   font-size: 13px;
//   cursor: pointer;
// `;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const modeState = useAppSelector((state) => state.themeReducer.isChange);
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
    <Signup.SignContainer>
      <Link to='/'>
        {modeState === "dark" ? <Signup.Logo src={logo_white} /> : <Signup.Logo src={logo_black} />}
      </Link>
      <FormContainer>
        <EmailInput
          type='email'
          placeholder='이메일'
          {...register("email", {
            required: "이메일을 입력해 주세요.",
          })}
        />
        {errors.email && <Signup.EmailErrormsg>{errors.email.message}</Signup.EmailErrormsg>}
        <Signup.PasswordInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
          })}
        />
        {errors.password && (
          <Signup.PasswordErrormsg>{errors.password.message}</Signup.PasswordErrormsg>
        )}
        <Signup.SubmitButton onClick={handleSubmit(onSubmit)}>로그인</Signup.SubmitButton>
      </FormContainer>
      {/* <PasswordFind>비밀번호를 잊으셨나요?</PasswordFind> */}
      <Link to='/Signup'>
        <Signup.MovePageButton>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </Signup.MovePageButton>
      </Link>
    </Signup.SignContainer>
  );
}

export default Login;
