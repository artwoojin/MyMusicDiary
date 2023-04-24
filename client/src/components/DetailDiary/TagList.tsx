import styled from "styled-components";

const TagContainer = styled.li`
  display: flex;
  align-items: center;
  height: 25px;
  padding: 4px 7px 4px 7px;
  border: 1px solid ${(props) => props.theme.color.borderLine};
  border-radius: 50px;

  @media screen and (max-width: 721px) {
    height: 25px;
  }
`;

function TagList({ list }: any) {
  return <TagContainer>{list.tagName}</TagContainer>;
}

export default TagList;
