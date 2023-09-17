import styled from "styled-components";
import { Link } from "react-router-dom";
import { PlaylistDataProps } from "../../util/type";
import mainIcon from "../../assets/images/mainIcon.png";

const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  padding: 0 5px 0 5px;

  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.buttonHover};

    > .thumbnail {
      border-radius: 50px;
    }
  }
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
  padding: 6px 0 6px 0;

  > .thumbnail {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 4px;
    object-fit: cover;
    background-color: ${(props) => props.theme.color.background};
  }

  > .listTitle {
    flex: 7;
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    width: 100%;
    color: ${(props) => props.theme.color.mainText};
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.35;
    /* border: 1px solid red; */
  }

  > .listChannelTitle {
    flex: 3;
    margin-left: 60px;
    min-width: 130px;
    font-size: 14px;
    color: ${(props) => props.theme.color.subText};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* border: 1px solid red; */

    @media screen and (max-width: 721px) {
      margin-left: 20px;
      min-width: 100px;
    }
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
            <div className='listChannelTitle'>{list.channelTitle}</div>
          </ContentArea>
        </Link>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default DetailPlayList;
