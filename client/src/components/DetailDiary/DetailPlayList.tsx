import styled from "styled-components";
import { Link } from "react-router-dom";
import { PlaylistDataProps } from "../../util/Type";
import mainIcon from "../../assets/images/mainIcon.png";

const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  border: none;
  color: ${(props) => props.theme.color.mainText};

  > a {
    text-decoration: none;
  }
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;

  > .thumbnail {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 4px;
    object-fit: cover;
    background-color: ${(props) => props.theme.color.background};
  }

  > .listTitle {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    font-weight: ${(props) => props.theme.font.contentWeight};
    width: 100%;
    color: ${(props) => props.theme.color.mainText};
  }

  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

function DetailPlayList({ list }: PlaylistDataProps) {
  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <PlayListContainer>
      <PlayListWrapper>
        <Link to={list.url!} target='_blank'>
          <ContentArea>
            <img
              className='thumbnail'
              src={list.thumbnail ? list.thumbnail : mainIcon}
              alt='썸네일'
              onError={replaceImg}
            />
            <div className='listTitle'>{list.title}</div>
          </ContentArea>
        </Link>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default DetailPlayList;
