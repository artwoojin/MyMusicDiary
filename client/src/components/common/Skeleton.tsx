import styled from "styled-components";

export default function Skeleton() {
  return (
    <DiaryMainContainer>
      <DiaryMainWrapper>
        <DiaryListContainer>
          <Thumbnail />
          <InfoArea>
            <div className='infoTitle'></div>
            <div className='infoDate'></div>
          </InfoArea>
          <UserArea>
            <ByUsername>
              <Profile />
              <div className='userNickname'></div>
            </ByUsername>
          </UserArea>
        </DiaryListContainer>
        <DiaryListContainer>
          <Thumbnail />
          <InfoArea>
            <div className='infoTitle'></div>
            <div className='infoDate'></div>
          </InfoArea>
          <UserArea>
            <ByUsername>
              <Profile />
              <div className='userNickname'></div>
            </ByUsername>
          </UserArea>
        </DiaryListContainer>
        <DiaryListContainer>
          <Thumbnail />
          <InfoArea>
            <div className='infoTitle'></div>
            <div className='infoDate'></div>
          </InfoArea>
          <UserArea>
            <ByUsername>
              <Profile />
              <div className='userNickname'></div>
            </ByUsername>
          </UserArea>
        </DiaryListContainer>
        <DiaryListContainer>
          <Thumbnail />
          <InfoArea>
            <div className='infoTitle'></div>
            <div className='infoDate'></div>
          </InfoArea>
          <UserArea>
            <ByUsername>
              <Profile />
              <div className='userNickname'></div>
            </ByUsername>
          </UserArea>
        </DiaryListContainer>
      </DiaryMainWrapper>
    </DiaryMainContainer>
  );
}

const DiaryMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 55px;

  @media screen and (max-width: 1449px) {
    max-width: 1070px;
  }

  @media screen and (max-width: 1084px) {
    max-width: 705px;
  }

  @media screen and (max-width: 721px) {
    max-width: 340px;
  }
`;

const DiaryListContainer = styled.li`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  width: 310px;
  height: 330px;
  list-style: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.inputBackground};
`;

const Thumbnail = styled.div`
  width: 310px;
  height: 174.5px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: ${(props) => props.theme.color.borderLine};
`;

const InfoArea = styled.div`
  padding: 15px;

  > .infoTitle {
    width: 100%;
    height: 25px;
    border-radius: 4px;
    margin-bottom: 5px;
    background: ${(props) => props.theme.color.borderLine};
  }

  > .infoDate {
    width: 100px;
    height: 20px;
    border-radius: 4px;
    background: ${(props) => props.theme.color.borderLine};
  }
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px 8px 15px;
  border-top: 1px solid ${(props) => props.theme.color.userAreaLine};
  margin-top: 32.5px;
`;

const ByUsername = styled.div`
  display: flex;
  align-items: center;

  > .userNickname {
    width: 100px;
    height: 20px;
    border-radius: 4px;
    background: ${(props) => props.theme.color.borderLine};
  }
`;

const Profile = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.borderLine};
`;
