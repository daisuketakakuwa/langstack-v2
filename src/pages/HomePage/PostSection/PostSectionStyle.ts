import styled from "styled-components";

export const PostSectionStyled = styled.div`
  margin-bottom: 100px;
`;

export const PostCard = styled.div`
  border: 5px solid black;
  border-radius: 10px;
  margin: 20px 20px;
  position: relative;
  z-index: 10;
`;

type PostCardItemProp = {
  fontSize: number;
  fontFamily: number;
};

export const PostCardItem = styled.div`
  margin-left: 5px;
  overflow-wrap: break-word;
  font-size: ${(props: PostCardItemProp) => props.fontSize}px;
  font-family: ${(props: PostCardItemProp) => props.fontFamily};
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
`;

export const PostSectionBar = styled.div`
  border-top: 2px solid black;
  height: 1px;
  width: 100%;
`;

export const ContentSection = styled.div`
  white-space: pre-line;
  padding: 6px;
`;
