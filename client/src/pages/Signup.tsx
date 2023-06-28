import * as Styled from "../assets/style/authStyle";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../util/api";
import { toast } from "react-toastify";
import { FormValue } from "../util/interface";
import logo_black from "../assets/images/logo_black.png";
import logo_white from "../assets/images/logo_white.png";
import { useAppSelector } from "../redux/hooks/hooks";

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
    <Styled.SignContainer>
      <Link to='/'>
        {modeState === "dark" ? <Styled.Logo src={logo_white} /> : <Styled.Logo src={logo_black} />}
      </Link>
      <Styled.FormContainer>
        <Styled.FormValueInput
          type='text'
          placeholder='닉네임'
          {...register("nickname", {
            required: "닉네임을 입력해 주세요.",
            maxLength: { value: 10, message: "10자리 이하로 입력해 주세요." },
          })}
        />
        {errors.nickname && <Styled.ErrorMsg>{errors.nickname.message}</Styled.ErrorMsg>}
        <Styled.FormValueInput
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
        {errors.email && <Styled.ErrorMsg>{errors.email.message}</Styled.ErrorMsg>}
        <Styled.FormValueInput
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
        {errors.password && <Styled.ErrorMsg>{errors.password.message}</Styled.ErrorMsg>}
        <Styled.SubmitButton type='button' onClick={handleSubmit(onSubmit)}>
          가입
        </Styled.SubmitButton>
      </Styled.FormContainer>
      <Link to='/login'>
        <Styled.MovePageButton>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </Styled.MovePageButton>
      </Link>
    </Styled.SignContainer>
  );
}

export default Signup;
