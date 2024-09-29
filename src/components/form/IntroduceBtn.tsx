import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

// Props에 onClick 함수 타입 추가
interface IntroProps {
  children: React.ReactNode;
  onClick: () => void; // onClick 이벤트 핸들러 추가
}

const IntroduceBtn: React.FC<IntroProps> = ({ children, onClick }) => {
  return <BtnStyle onClick={onClick}>{children}</BtnStyle>;
};

export default IntroduceBtn;

const BtnStyle = styled.button`
  display: flex;
  width: 80%;
  color: #121212;
  height: 10%;
  align-items: center;
  max-height: 60px;
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 5%;
  background: #fff;
  cursor: pointer; // 버튼에 마우스 커서 적용
`;
