import * as Styled from "../assets/style/authStyle";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../util/api";
import { toast } from "react-toastify";
import { FormValue } from "../util/type";
import logo_black from "../assets/images/logo_black.png";
import logo_white from "../assets/images/logo_white.png";
import { useAppSelector } from "../redux/hooks/hooks";

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
    <Styled.SignContainer>
      <Link to='/'>
        {modeState === "dark" ? <Styled.Logo src={logo_white} /> : <Styled.Logo src={logo_black} />}
      </Link>
      <Styled.FormContainer>
        <Styled.FormValueInput
          type='email'
          placeholder='이메일'
          {...register("email", {
            required: "이메일을 입력해 주세요.",
          })}
        />
        {errors.email && <Styled.ErrorMsg>{errors.email.message}</Styled.ErrorMsg>}
        <Styled.FormValueInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
          })}
        />
        {errors.password && <Styled.ErrorMsg>{errors.password.message}</Styled.ErrorMsg>}
        <Styled.SubmitButton onClick={handleSubmit(onSubmit)}>로그인</Styled.SubmitButton>
      </Styled.FormContainer>
      {/* <PasswordFind>비밀번호를 잊으셨나요?</PasswordFind> */}
      <Link to='/Signup'>
        <Styled.MovePageButton>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </Styled.MovePageButton>
      </Link>
    </Styled.SignContainer>
  );
}

export default Login;
