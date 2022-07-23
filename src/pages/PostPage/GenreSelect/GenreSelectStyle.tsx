import styled from "styled-components";

type GenreSelectBox = {
  width: string;
};

export const GenreSelectBox = styled.select`
  font-size: 20px;
  height: 30px;
  width: ${(props: GenreSelectBox) => props.width};
`;

export const GenreTextBox = styled.input`
  font-size: 20px;
  width: 67%;
  height: 24px;
`;

export const SwitchGenreButton = styled.button`
  background-color: white;
  font-size: 20px;
  margin-left: 10px;
`;
