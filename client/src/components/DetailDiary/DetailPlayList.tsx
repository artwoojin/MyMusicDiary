import styled from "styled-components";
import { Link } from "react-router-dom";
import { PlaylistDataProps } from "../../util/Type";
import defaultProfile from "../../util/img/mainIcon.png";

const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
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
    margin-right: 20px;
    border-radius: 4px;
    object-fit: cover;
    background-color: ${(props) => props.theme.color.background};
  }

  > .listTitle {
    font-size: 15px;
    font-weight: ${(props) => props.theme.font.contentWeight};
    width: 100%;
    color: ${(props) => props.theme.color.mainText};
  }

  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.likeHover};
  }
`;

function DetailPlayList({ list }: PlaylistDataProps) {
  return (
    <PlayListContainer>
      <PlayListWrapper>
        <Link to={list.url!} target='_blank'>
          <ContentArea>
            <img
              className='thumbnail'
              src={list.thumbnail ? list.thumbnail : defaultProfile}
              alt='썸네일'
            />
            <div className='listTitle'>{list.title}</div>
          </ContentArea>
        </Link>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default DetailPlayList;
