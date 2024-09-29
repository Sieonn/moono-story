import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAtom } from 'recoil/userAtom';
import styled from 'styled-components';
import Container from '../components/css/Container';
import theme from 'styles/theme';
import { useRecoilState } from 'recoil';
import YouTube from 'react-youtube';

const Main = (props: any) => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userAtom);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = '_YwXAbkXXyY'; // YouTube video ID

  const handleButtonClick = (id: string) => {
    navigate(`/contIntro/${id}`);
  };

  const handlePreviewClick = () => {
    setIsPlaying(true);
  };

  const hadleStampClick = () => {
    navigate('/stamp');
  };

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
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

  const opts = {
    height: '100%', // Set height to 100%
    width: '100%', // Set width to 100%
    playerVars: {
      autoplay: 1, // Auto play
    },
  };

  return (
    <Container
      style={{ padding: '15px', overflowY: 'scroll' }}
      isDarkMode={false}
    >
      <HederStyled>
        <LogoStyled>MOOS</LogoStyled>
        <LogoRightSection>
          <img
            src={`${process.env.PUBLIC_URL}/images/main/stamp.png`}
            alt="스탬프"
            onClick={hadleStampClick}
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/bell.png`}
            alt="알람"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/user.png`}
            alt="사용자"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            onClick={togglePopover}
          />
          {isOpen && (
            <Popover ref={popoverRef}>
              <PopoverContent>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4em' }}>반가워요</div>
                  <div>{user.nickName}님</div>
                </div>
                <PopoverBtn>로그아웃</PopoverBtn>
              </PopoverContent>
            </Popover>
          )}
        </LogoRightSection>
      </HederStyled>
      <IntroMoo>
        <IntroText style={{ fontFamily: 'Pretendard' }}>
          <div style={{ color: `${theme.color.mainColor}` }}>
            용궁에서 꿈을 찾아 온 무너
          </div>
          <div style={{ fontSize: '1.6em', letterSpacing: '-1px' }}>안녕?</div>
          <div style={{ fontSize: '1.6em', letterSpacing: '-1px' }}>
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

      {/* YouTube Video Section */}
      <VideoContainer>
        {!isPlaying ? (
          <PreviewImage
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="YouTube Video Preview"
            onClick={handlePreviewClick}
          />
        ) : (
          <YouTube
            videoId={videoId}
            opts={opts}
            onEnd={() => setIsPlaying(false)}
          />
        )}
      </VideoContainer>

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
            <div>
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
        {/* Additional Buttons... */}
      </MenuContanier>
    </Container>
  );
};

export default Main;

const VideoContainer = styled.div`
  position: relative; // Ensure the video can scale
  width: 100%; // Full width

`;

const PreviewImage = styled.img`
  width: 100%;
  cursor: pointer;
  position: absolute; // Positioning for the image
  top: 0;
  left: 0;
  height: 100%;
  object-fit: cover; // Cover to maintain aspect ratio
`;

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
  width: 100%;
  height: 40%;
`;

const Menubutton = styled.button`
  flex: 1;
  border-radius: 15px;
  font-size: 1.1em;
  font-weight: 600;
  color: #121212;
  overflow: hidden;
  padding: 5%;
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
  justify-content: flex-end;
  img {
    height: 55%;
    margin-left: 10%;
  }
`;

const IntroText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 2em;
  width: 100%;
  font-weight: bold;
  margin-left: 5%;
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
  align-items: center;
  justify-content: center;
`;

const PopoverContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PopoverBtn = styled.button`
  width: 100%;
  padding: 7%;
  color: #121212;
`;
