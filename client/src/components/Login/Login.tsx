import styled from "styled-components";
import * as Signup from "../Signup/Signup";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";
import { toast } from "react-toastify";
import { FormValue } from "../../util/Type";
import { MyContext } from "../../util/MyContext";
import logo_black from "../../assets/images/logo_black.png";
import logo_white from "../../assets/images/logo_white.png";

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

  const { isChange }: any = useContext(MyContext);
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
        localStorage.removeItem("mainCurrentTab");
        localStorage.removeItem("mainCurrentPage");
        localStorage.removeItem("mainCurrentPageBlock");
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
        {isChange === "dark" ? <Signup.Logo src={logo_white} /> : <Signup.Logo src={logo_black} />}
      </Link>
      <FormContainer>
        <Signup.EmailInput
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
