import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

// Props에 onClick 함수와 isDarkMode 추가
interface IntroProps {
  children: React.ReactNode;
  onClick: () => void; // onClick 이벤트 핸들러 추가
  isDarkMode: boolean; // 다크 모드 상태 추가
}

const IntroduceBtn: React.FC<IntroProps> = ({
  children,
  onClick,
  isDarkMode,
}) => {
  return (
    <BtnStyle onClick={onClick} isDarkMode={isDarkMode}>
      {children}
    </BtnStyle>
  );
};

export default IntroduceBtn;

const BtnStyle = styled.button<{ isDarkMode: boolean }>`
  display: flex;
  width: 80%;
  height: 10%;
  align-items: center;
  max-height: 60px;
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 5%;
  cursor: pointer; // 버튼에 마우스 커서 적용
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? '#20232a' : '#fff'}; // 다크 모드 배경색
  color: ${({ isDarkMode }) =>
    isDarkMode ? '#fff' : '#000'}; // 다크 모드 글자색
  border: none; // 기본 버튼 테두리 제거
  border-radius: 5px; // 모서리 둥글게
  transition:
    background-color 0.3s,
    color 0.3s; // 부드러운 전환 효과
`;
