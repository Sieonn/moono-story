import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
  children: React.ReactNode;
  bgColor?: string; // 배경색을 변경할 수 있는 props 추가
  iconSrc?: string; // 아이콘을 변경할 수 있는 props 추가
}

const Header: React.FC<HeaderProps> = ({
  children,
  bgColor = '#fff',
  iconSrc,
}) => {
  const navigate = useNavigate();

  return (
    <HeaderStyle bgColor={bgColor}>
      <BackIcon onClick={() => navigate(-1)}>
        <img
          src={
            iconSrc || `${process.env.PUBLIC_URL}/images/header/blackBack.png`
          } // iconSrc가 있으면 해당 값, 없으면 기본값
          alt="Back"
          style={{ width: '50%' }}
        />
      </BackIcon>
      <Title>{children}</Title>
      <Placeholder /> {/* 레이아웃 균형을 맞추기 위한 Placeholder 추가 */}
    </HeaderStyle>
  );
};

export default Header;

// 스타일 정의에 bgColor 적용
const HeaderStyle = styled.div<{ bgColor: string }>`
  // bgColor를 받기 위해 제네릭 사용
  position: absolute;
  top: 0;
  left: 50%; /* 화면의 50% 위치 */
  transform: translateX(-50%); /* 자신의 너비의 절반만큼 왼쪽으로 이동 */
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  max-width: 480px;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ bgColor }) => bgColor}; // 전달받은 배경색 적용
`;

const BackIcon = styled.div`
  cursor: pointer;
  width: 10%;
`;

const Title = styled.span`
  flex: 1;
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
`;

const Placeholder = styled.div`
  width: 10%; /* BackIcon과 동일한 너비로 레이아웃 균형 맞춤 */
`;
