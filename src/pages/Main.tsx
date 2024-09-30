import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAtom } from 'recoil/userAtom';
import styled from 'styled-components';
import Container from '../components/css/Container';
import theme from 'styles/theme';
import { useRecoilState } from 'recoil';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { modeAtom } from 'recoil/modeAtom';

const Main = (props: any) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useRecoilState(modeAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const popoverRef = useRef<HTMLDivElement | null>(null); // ref 생성
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleButtonClick = (id: string) => {
    navigate(`/contIntro/${id}`);
  };
  const hadleStampClick = () => {
    navigate('/stamp');
  };

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    alert('로그아웃 되었습니다 !');
    sessionStorage.clear();
    navigate('/login');
  };
  // 다크 모드 상태를 localStorage에서 가져오기
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, [setDarkMode]);

  // 다크 모드 상태를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  const handleModeChange = () => {
    setDarkMode((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <Container
      style={{ padding: '15px', overflowY: 'scroll' }}
      isDarkMode={darkMode}
    >
      <HederStyled>
        <LogoStyled>MOOS</LogoStyled>
        <LogoRightSection>
          {darkMode ? (
            <img
              src={`${process.env.PUBLIC_URL}/images/main/stampDark.png`}
              alt="스탬프"
              onClick={() => hadleStampClick()}
              style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/images/main/stampLight.png`}
              alt="스탬프"
              onClick={() => hadleStampClick()}
              style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            />
          )}

          {darkMode ? (
            <LightModeIcon
              sx={{
                cursor: 'pointer',
                fontSize: '26px',
                marginLeft: '10%',
              }}
              onClick={() => {
                handleModeChange();
              }}
            />
          ) : (
            <DarkModeIcon
              sx={{
                cursor: 'pointer',
                fontSize: '26px',
                marginLeft: '10%',
              }}
              onClick={() => {
                handleModeChange();
              }}
            />
          )}

          <img
            src={`${process.env.PUBLIC_URL}/images/main/user.png`}
            alt="사용자"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            onClick={togglePopover}
          />
          {isOpen && (
            <Popover ref={popoverRef}>
              <PopoverContent>
                <div style={{ textAlign: 'center', color: 'black' }}>
                  <div style={{ marginBottom: '10px' }}>반가워요</div>
                  <div
                    style={{
                      fontSize: '1.4em',
                      marginBottom: '10px',
                      fontWeight: '900',
                    }}
                  >
                    {user.nickName}님
                  </div>
                </div>
                <PopoverBtn onClick={handleLogout}>로그아웃</PopoverBtn>
              </PopoverContent>
            </Popover>
          )}
        </LogoRightSection>
      </HederStyled>
      <IntroMoo>
        <IntroText>
          <div style={{ color: `${theme.color.mainColor}` }}>
            용궁에서 찾아온 무너
          </div>
          <div style={{ fontSize: '1.6em', fontWeight: '800' }}>안녕?</div>
          <div style={{ fontSize: '1.6em', fontWeight: '800' }}>
            나는 무너야 : )
          </div>
          <div
            style={{
              fontSize: '1em',
              fontWeight: '500',
              lineHeight: '2.3em',
            }}
          >
            내 이야기를 들어줄래?
          </div>
        </IntroText>
        <IntroMooImg>
          <img
            src={`${process.env.PUBLIC_URL}/images/moono/하이무너.png`}
            alt="알람"
          />
        </IntroMooImg>
      </IntroMoo>
      <MenuContanier>
        <FirstColButon>
          <Menubutton
            style={{
              backgroundColor: '#72dcfc',
              textAlign: 'left',
              flexDirection: 'column',
              fontSize: '1.2em',
              color: '#fff',
            }}
            onClick={() => handleButtonClick('introduce')}
          >
            <div style={{ height: '35%', letterSpacing: '-1px' }}>
              안녕?
              <br />
              나를 소개할게
            </div>
            <div style={{ height: '70%' }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/moono/2D하이.png`}
                alt="무퀴즈"
                style={{
                  height: '190%',
                  display: 'flex',
                  marginLeft: '10%',
                }}
              />
            </div>
          </Menubutton>
          <Menubutton
            style={{
              display: 'flex',
              backgroundColor: '#c9c9c9',
              fontWeight: '700',
              textAlign: 'left',
              flexDirection: 'column',
              color: '#fff',
            }}
            onClick={() => handleButtonClick('mooQuiz')}
          >
            <div
              style={{
                letterSpacing: '-1px',
                height: '20%',
                marginBottom: '5%',
              }}
            >
              나에 대해서
              <br />
              얼마나 알고 있어?
            </div>
            <div style={{}}>
              <img
                src={`${process.env.PUBLIC_URL}/images/moono/2D헤드셋.png`}
                alt="무퀴즈"
                style={{
                  width: '100%',
                  marginLeft: '20%',
                  marginTop: '5%',
                }}
              />
            </div>
          </Menubutton>
        </FirstColButon>
        <LargeButton
          style={{
            backgroundColor: `${theme.color.mainColor}`,
            display: 'flex',
          }}
          onClick={() => handleButtonClick('cheerup')}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/moono/2D둥둥.png`}
              alt="무퀴즈"
              style={{
                width: '80%', // 이미지가 div의 너비에 맞게 조정
                marginLeft: '25%',
              }}
            />
            <div
              style={{
                color: '#fff',
                zIndex: 2,
                position: 'absolute',
                top: '0',
                left: '0',
                fontSize: '1.2em',
                textAlign: 'left',
              }}
            >
              무너를
              <br />
              응원해줘!
            </div>
          </div>
        </LargeButton>
        <ThirdButton>
          <Menubutton
            style={{
              backgroundColor: `${theme.color.pointColor}`,
              textAlign: 'left',
              fontWeight: '700',
              display: 'inline-block',
            }}
            onClick={() => handleButtonClick('fortune')}
            bgImage={`${process.env.PUBLIC_URL}/images/main/clover2.png`}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ flexDirection: 'column', width: '100%' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  오늘의 나는? 어떨까?
                </div>
                <span
                  style={{
                    color: `${theme.color.mainColor}`,
                    fontSize: '20px',
                    fontWeight: '800',
                  }}
                >
                  무너보살
                </span>
              </div>
            </div>
          </Menubutton>

          <Menubutton
            onClick={() => handleButtonClick('fourcut')}
            style={{ textAlign: 'left' }}
            bgImage=""
          >
            {' '}
            <div style={{}}>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: `${theme.color.mainColor}`,
                }}
              >
                무너 만들기
              </div>
              <div style={{ fontSize: '12px', fontWeight: '500' }}>
                나만의 무너를 만들어봐
              </div>
            </div>
          </Menubutton>
        </ThirdButton>
      </MenuContanier>
    </Container>
  );
};

export default Main;

interface MenubuttonProps {
  bgImage?: string; // 배경 이미지 프로퍼티 추가
}

const HederStyled = styled.div`
  display: flex;
  width: 100%;
  height: 7%;
`;

const IntroMoo = styled.div`
  display: flex;
  width: 90%;
  height: 25%;
`;

const MenuContanier = styled.div`
  height: 63%;
  display: flex;
  grid-gap: 2%;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const FirstColButon = styled.div`
  display: flex;
  flex: 1;
  gap: 3%;
  width: 100%; /* 전체 너비 사용 */
  height: 40%;
`;

const Menubutton = styled.button<MenubuttonProps>`
  flex: 1;
  border-radius: 15px;
  font-size: 1.1em;
  font-weight: 600;
  color: #121212;
  overflow: hidden;
  padding: 5%;

  background-image: url(${(props) => props.bgImage}); /* 배경 이미지 설정 */
  background-size: contain; /* 배경 이미지 크기 조정 */
  background-repeat: no-repeat;
  background-position: 105% 50%; // 위치 조정
`;

const LargeButton = styled(Menubutton)`
  flex: 0.6;
  margin: auto 0;
`;

const ThirdButton = styled.div`
  display: flex;
  flex: 0.6;
  gap: 3%;
  margin: auto 0;
  width: 100%; /* 전체 너비 사용 */
`;

const LogoStyled = styled.div`
  font-weight: 900;
  color: ${theme.color.mainColor};
  font-size: 2em;
  letter-spacing: -4px;
  width: 60%;
`;

const LogoRightSection = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end; /* 우측 정렬 */
  img {
    height: 55%;
    margin-left: 10%;
  }
`;

const IntroText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  line-height: 2em;
  width: 100%;
  font-weight: bold;
  margin-left: 5%;
  letter-spacing: -1px;
`;

const IntroMooImg = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  img {
    height: 100%;
  }
`;

const Popover = styled.div`
  position: absolute;
  top: 50px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 200px;
  height: 20%;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`;

const PopoverContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  width: 100%;
`;

const PopoverBtn = styled.button`
  width: 100%;
  padding: 7%;
  color: #121212;
`;
