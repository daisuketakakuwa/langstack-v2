import styled from "styled-components";

export const NavigationBar = styled.div`
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  bottom: 0;
  padding-top: 8px;
  margin-left: -8px;
  width: 100%;
  height: 60px;
  border-top: 3px solid black;
  z-index: 100;
  background-color: white;
  text-align: center;
`;

export const NavigationIcon = styled.div`
  width: 100px;
  height: 52px;
`;
