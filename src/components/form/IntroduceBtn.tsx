import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from 'styles/theme';

// Props에 onClick 함수와 isDarkMode 추가
interface IntroProps {
  children: React.ReactNode;
  onClick: () => void; // onClick 이벤트 핸들러 추가
  isDarkMode: boolean; // 다크 모드 상태 추가
  disabled: boolean; // 비활성화 상태 추가
}

const IntroduceBtn: React.FC<IntroProps> = ({
  children,
  onClick,
  isDarkMode,
  disabled,
}) => {
  return (
    <InputContainer
      onClick={disabled ? undefined : onClick}
      isDarkMode={isDarkMode}
    >
      <FormStyled disabled={disabled}>
        <InputStyled isDarkMode={isDarkMode}>{children}</InputStyled>
        <SendIconWrapper disabled={disabled}>
          <Icon
            src={`${process.env.PUBLIC_URL}/images/intro/send.png`}
            alt="Send Icon"
          />
        </SendIconWrapper>
      </FormStyled>
    </InputContainer>
  );
};

export default IntroduceBtn;

const InputContainer = styled.div<{ isDarkMode: boolean }>`
  position: absolute; //화면 하단에 고정
  z-index: 2;
  bottom: 0;
  left: 50%; // 가운데 정렬을 위한 시작점
  transform: translateX(-50%); //가운데 정렬
  width: 100%;
  max-width: 430px; /* 부모 요소의 max-width와 동일하게 설정 */
  padding: 12px 8px 32px;
  display: flex;
  justify-content: center;
`;

const FormStyled = styled.div<{ disabled: boolean }>`
  width: 90%;
  border-radius: 24px;
  padding: 6px;
  background: ${({ disabled }) => (disabled ? '#e3e3e35f' : '#e3e3e35f')};
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-between; /* 요소 간의 공간을 균등하게 분배 */
  align-items: center; /* 세로 방향 중앙 정렬 */
  opacity: ${({ disabled }) =>
    disabled ? 0.5 : 1}; /* 비활성화 시 투명도 변경 */
  pointer-events: ${({ disabled }) =>
    disabled ? 'none' : 'auto'}; /* 비활성화 시 클릭 이벤트 차단 */
`;

const InputStyled = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  padding: 8px 16px;
  resize: none;
  border: none;
  background: none;
  color: #242424;
  font-weight: 400;
  letter-spacing: -0.4px;
  cursor: text;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
`;

const SendIconWrapper = styled.div<{ disabled: boolean }>`
  width: 52px;
  height: 36px;
  border-radius: 24px; /* 원형으로 만들기 */
  background-color: ${theme.color.mainColor};
  display: flex;
  justify-content: center;
  align-items: center; /* 아이콘을 중앙에 정렬 */
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed' : 'pointer'}; /* 비활성화 시 커서 변경 */
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  fill: none;
  stroke-width: 2;
`;

const Blink = keyframes`
  0%, 50%, 100%{
    opacity: 1;
  }
  25%, 75%{
    opacity: 0;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  margin-right: 15px;
  border-style: solid;
  border-width: 6px 0px 6px 12px;
  border-color: transparent ${theme.color.mainColor};
  animation: ${Blink} 2.5s infinite;
`;
