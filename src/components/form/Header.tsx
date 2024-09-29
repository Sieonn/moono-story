import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
  children: React.ReactNode;
  bgColor?: string;
  iconSrc?: string;
}
const Header: React.FC<HeaderProps> = ({
  children,
  bgColor = '#fff',
  iconSrc = `${process.env.PUBLIC_URL}/images/header/blackBack.png`,
}) => {
  const navigate = useNavigate();

  return (
    <HeaderStyle bgColor={bgColor}>
      {iconSrc && (
        <BackIcon onClick={() => navigate(-1)}>
          <img src={iconSrc} alt="Back" style={{ width: '100%' }} />
        </BackIcon>
      )}
      <Title style={{ marginRight: '5%' }}>{children}</Title>{' '}
      {/* children으로 타이틀을 받음 */}
    </HeaderStyle>
  );
};

export default Header;
const HeaderStyle = styled.div<{ bgColor: string }>`
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
  background-color: ${({ bgColor }) => bgColor}; // Use bgColor prop
`;

const BackIcon = styled.div`
  /* flex: 0.5; */
  width: 5%;
  cursor: pointer;
`;

const Title = styled.span`
  flex: 1;
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
`;

const Placeholder = styled.div`
  width: 5%; /* BackIcon과 동일한 너비로 레이아웃 균형 맞춤 */
`;
