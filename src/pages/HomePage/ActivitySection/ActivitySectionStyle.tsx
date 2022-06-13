import styled from "styled-components";

export const ActivityBox = styled.div`
  margin: 10px 20px;
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
`;

export const ActivityRecord = styled.div`
  font-weight: 900;
  margin: 10px 0px;
`;

type ActivityGaugeProp = {
  gaugeWidth: number;
};

export const ActivityGauge = styled.div`
  display: inline-block;
  background-color: #00ffff;
  margin: 0px 8px;
  width: ${(props: ActivityGaugeProp) => props.gaugeWidth}px;
  height: 10px;
`;
