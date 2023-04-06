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
  font-weight: 700;
  font-size: 27px;
  margin-bottom: 30px;

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
  width: 410px;
  height: 250px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.color.disabledTagBorder};
  background-color: ${(props) => props.theme.color.disabledTagBackground};
`;

const EmailInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.disabledTagBorder};
  background-color: ${(props) => props.theme.color.background};

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
  color: ${(props) => props.theme.color.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.color.disabledTagBorder};
  background-color: ${(props) => props.theme.color.background};

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
  font-weight: ${(props) => props.theme.font.titleWeight};
  margin-top: 30px;
  background-color: ${(props) => props.theme.color.mainColor};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

const PasswordFind = styled.div`
  margin-top: 23px;
  color: ${(props) => props.theme.color.mainText};
  font-size: 13px;
  cursor: pointer;
`;

const MoveSignup = styled.button`
  font-size: 14px;
  margin-top: 20px;
  width: 410px;
  height: 60px;
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.color.mainText};
  border: 1px solid ${(props) => props.theme.color.disabledTagBorder};
  background-color: ${(props) => props.theme.color.disabledTagBackground};
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

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    BASE_API.post(`/auth/login`, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (res.headers.authorization) {
          localStorage.setItem("accessToken", res.headers.authorization);
          localStorage.setItem("CURRENT_USER", JSON.stringify(res.data));
        }
      })
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        // 401 = 이메일 or 비밀번호를 잘못 입력했을 때
        if (err.response.status === 401) toast.error("입력하신 내용을 다시 확인해주세요.");
      });
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
        <LoginButton type='button' onClick={handleSubmit(onSubmit)}>
          로그인
        </LoginButton>
      </FormContainer>
      <PasswordFind>비밀번호를 잊으셨나요?</PasswordFind>
      <Link to='/Signup'>
        <MoveSignup>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </MoveSignup>
      </Link>
    </LoginContainer>
  );
}

export default Login;
