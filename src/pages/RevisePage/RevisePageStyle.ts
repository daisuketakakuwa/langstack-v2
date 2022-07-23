import styled from "styled-components";

export const RevisePageBox = styled.div`
  margin-top: 80px;
  margin: 0px 20px;
`;

export const RevisePageTitle = styled.div`
  font-size: 25px;
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
`;

export const DateInputStyled = styled.input`
  margin: 0px 5px;
  height: 25px;
`;

type FlexBoxProps = {
  flexDirection: string;
};

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props: FlexBoxProps) => props.flexDirection};
`;

export const SearchButton = styled.button`
  margin: 20px 0px;
  font-size: 30px;
  background-color: white;
`;
