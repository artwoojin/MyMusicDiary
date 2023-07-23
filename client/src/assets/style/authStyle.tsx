import styled from "styled-components";

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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  width: 90vw;
  max-width: 400px;
  padding: 25px 30px 20px 30px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.color.loginBorderLine};
  background-color: ${(props) => props.theme.color.inputBackground};
`;

export const FormValueInput = styled.input`
  font-size: 14px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  color: ${(props) => props.theme.color.mainText};
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
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: ${(props) => props.theme.color.signatureText};
  font-size: ${(props) => props.theme.font.diaryContentSize}px;
  font-weight: ${(props) => props.theme.font.titleWeight};
  margin-top: 10px;
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

export const ErrorMsg = styled.div`
  color: #d0393e;
  font-size: 12px;
`;
