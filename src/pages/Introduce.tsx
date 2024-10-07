import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import Contents from '../components/css/Contents';
import IntroduceBtn from '../components/form/IntroduceBtn';
import { useTypingEffect } from '../components/hook/useTypingEffect';
import data from '../assets/introduce.json';
import theme from 'styles/theme';
import { userAtom } from 'recoil/userAtom';
import { useRecoilState } from 'recoil';
import { UserInfoAPI } from '../api/UserInfoAPI';
import { StampAPI } from 'api/StampAPI';
import { modeAtom } from 'recoil/modeAtom';
import ChatBubble from '../components/form/ChatBubble';

interface Message {
  text: string;
  isButton: boolean;
}

export const Introduce = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [currentData, setCurrentData] = useState(data[pageIndex]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [user] = useRecoilState(userAtom);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stampStatus, setStampStatus] = useState({
    id: '',
    nickName: '',
    oneMission: false,
    twoMission: false,
    threeMission: false,
    fourMission: false,
    fiveMission: false,
  });
  const [isDarkMode] = useRecoilState(modeAtom);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const imagesWithUrls = [
    {
      src: `${process.env.PUBLIC_URL}/images/intro/instagram.png`,
      url: 'https://www.instagram.com/im_moono.41/',
      name: '인스타',
    },
    {
      src: `${process.env.PUBLIC_URL}/images/intro/web.png`,
      url: 'https://namu.wiki/w/%EB%AC%B4%EB%84%88',
      name: '나무위키',
    },
    {
      src: `${process.env.PUBLIC_URL}/images/intro/uplus.png`,
      url: 'https://www.lguplus.com/benefit/moono',
      name: '유플러스',
    },
    {
      src: `${process.env.PUBLIC_URL}/images/intro/moonostore.png`,
      url: 'https://smartstore.naver.com/moonostore',
      name: '무너스토어',
    },
  ];
  useEffect(() => {
    if (user && user.sub) {
      UserInfoAPI(user.sub)
        .then((data) => {
          setStampStatus({
            id: data.id,
            nickName: data.nickName,
            oneMission: true,
            twoMission: data.twoMission,
            threeMission: data.threeMission,
            fourMission: data.fourMission,
            fiveMission: data.fiveMission,
          });
        })
        .catch((error) => console.error('유저 정보 API 호출 실패:', error));
    }
  }, [user]);

  useEffect(() => {
    if (pageIndex >= 0) {
      setCurrentData(data[pageIndex]);
      setIsDataLoaded(true);
    }
  }, [pageIndex]);

  const { displayedText, handleClick } = useTypingEffect(
    isDataLoaded ? currentData.text : '',
    100
  );

  const handleNextPage = () => {
    if (pageIndex < data.length - 1) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: displayedText, isButton: false },
        { text: currentData.buttonText, isButton: true },
      ]);
      setPageIndex(pageIndex + 1);
      setIsDataLoaded(false);
      setIsTypingComplete(false);
    } else {
      setPageIndex(-1);
    }
  };

  useEffect(() => {
    if (displayedText && displayedText === currentData.text) {
      setIsTypingComplete(true);
    }
  }, [displayedText, currentData.text]);

  useEffect(() => {
    const handleGlobalClick = () => {
      handleClick();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [handleClick]);

  const goToMain = () => {
    StampAPI(stampStatus)
      .then(() => {
        alert('무너 소개 미션 완료 !');
        window.location.href = '/main';
      })
      .catch((error) => console.error('스템 API 호출 실패:', error));
  };

  // 메시지나 타이핑되는 텍스트가 변경될 때마다 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, displayedText]); // messages와 displayedText가 변경될 때마다 스크롤

  return (
    <Container isDarkMode={isDarkMode}>
      <Header
        iconSrc={
          isDarkMode
            ? `${process.env.PUBLIC_URL}/images/header/whiteBack.png`
            : `${process.env.PUBLIC_URL}/images/header/blackBack.png`
        }
        bgColor={isDarkMode ? '#20232a' : '#fff'}
      >
        {'무너 소개서'}
      </Header>

      {pageIndex >= 0 ? (
        <StyledContents isDarkMode={isDarkMode}>
          <ContentSection style={{ height: '50%' }}>
            <ImgSection>
              <img src={currentData.img} alt="무너 이미지" />
            </ImgSection>
          </ContentSection>
          <ChattingContainer ref={chatContainerRef}>
            <div
              style={{
                fontSize: '0.7em',
                textAlign: 'center',
                margin: '0',
                color: `${theme.color.mainColor}`,
              }}
            >
              클릭으로 타이핑 스킵이 가능해요!
            </div>
            <WelcomeMessage isDarkMode={isDarkMode}>
              채팅방에 입장하셨습니다.
            </WelcomeMessage>
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                isButton={message.isButton}
                ref={(el) => (messageRefs.current[index] = el)}
                tabIndex={0}
              >
                {message.text}
              </ChatBubble>
            ))}
            {isDataLoaded && (
              <ChatBubble
                isButton={false}
                ref={(el) => (messageRefs.current[messages.length] = el)}
                tabIndex={0}
              >
                {displayedText}
              </ChatBubble>
            )}
            {pageIndex !== 5 ? (
              <IntroduceBtn
                onClick={handleNextPage}
                isDarkMode={isDarkMode}
                disabled={!isTypingComplete}
              >
                {currentData.buttonText}
              </IntroduceBtn>
            ) : (
              <InputContainer2 isDarkMode={isDarkMode}>
                <GoTMI
                  onClick={handleNextPage}
                  style={{ marginBottom: '20px' }}
                >
                  TMI 보러가기
                </GoTMI>
              </InputContainer2>
            )}
          </ChattingContainer>
        </StyledContents>
      ) : (
        <StyledContents isDarkMode={isDarkMode} style={{ minHeight: '930px' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              // marginTop: '10%',
            }}
          >
            <ContentSection style={{ textAlign: 'center' }}>
              <ImgSection style={{ minHeight: '400px' }}>
                <SemiTitle>SKILL</SemiTitle>
                <img
                  src={
                    isDarkMode
                      ? `${process.env.PUBLIC_URL}/images/intro/DarkModeSkill.png`
                      : `${process.env.PUBLIC_URL}/images/intro/무너능력.png`
                  }
                  alt="무너 능력치"
                />
              </ImgSection>
              <SkillText isDarkMode={isDarkMode}>
                인내심 말고는 못하는게 없는 <br />
                <span style={{ fontSize: '0.7em' }}>(거의)</span> 꽉 찬 오각형
              </SkillText>
              <TMISTtyle isDarkMode={isDarkMode}>
                <img src={`${process.env.PUBLIC_URL}/images/intro/alien.png`} />
                무너의 MBTI는 ENTJ이다
              </TMISTtyle>
              <ImgSection style={{ margin: 'auto', flexDirection: 'row' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/intro/moo3.png`}
                  style={{ width: '170px' }}
                />
              </ImgSection>
            </ContentSection>
            <URLImg>
              {/* <img
                src={`${process.env.PUBLIC_URL}/images/intro/instagram.png`}
                style={{ width: '35px' }} 
              />
              <img src={`${process.env.PUBLIC_URL}/images/intro/web.png`} />
              <img src={`${process.env.PUBLIC_URL}/images/intro/uplus.png`} />
              <img
                src={`${process.env.PUBLIC_URL}/images/intro/moonostore.png`}
              /> */}
              {imagesWithUrls.map((img, idx) => (
                <a
                  key={idx}
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    src={img.src}
                    alt=""
                    style={{ width: '35px', cursor: 'pointer' }} // 커서 포인터로 변경
                  />
                  <div style={{ fontSize: '10px', textAlign: 'center' }}>
                    {img.name}
                  </div>
                </a>
              ))}
            </URLImg>
          </div>
          <GoTMI onClick={goToMain} style={{ marginBottom: '20px' }}>
            미션 완료
          </GoTMI>
        </StyledContents>
      )}
    </Container>
  );
};

const WelcomeMessage = styled.div<{ isDarkMode: boolean }>`
  margin: 0 auto;
  width: 50%;
  text-align: center;
  padding: 10px 0;
  font-size: 10px;
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
  margin-bottom: 10px;
  background-color: #e4e4e465;
  border-radius: 10px;
`;
const URLImg = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  /* min-height: 80px; */

  img {
    width: 40px;
    height: 40px;
    margin: 10px;
    cursor: pointer;
  }
`;
const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const StyledContents = styled(Contents)`
  align-items: center;
  justify-content: center;
`;

const ImgSection = styled.div`
  img {
    width: 90%;
    max-width: 250px;
    height: auto;
  }
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
`;

const SemiTitle = styled.div`
  font-size: 1em;
  text-align: center;
  font-family: 'RixInooAriDuriR';
  font-weight: 900;
  color: #fff;
  background-color: ${theme.color.mainColor};
  margin: auto;
  margin-bottom: 10%;
  padding: 5px 10px;
  border-radius: 20px;
`;

const SkillText = styled.div<{ isDarkMode: boolean }>`
  width: 80%;
  margin: auto;
  color: ${({ isDarkMode }) => (isDarkMode ? '#000' : '#000')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#f3f3f3')};
  border-radius: 0 30px 0 30px;
  padding: 5% 0;
  text-align: center;
  margin: 5% auto;
`;

const ChattingContainer = styled.div`
  width: 80%;
  height: 600px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  margin-bottom: 20%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const InputContainer2 = styled.div<{ isDarkMode: boolean }>`
  position: absolute; //화면 하단에 고정
  z-index: 2;
  bottom: 0;
  left: 50%; // 가운데 정렬을 위한 시작점
  transform: translateX(-50%); //가운데 정렬
  width: 100%;
  max-width: 430px; /* 부모 요소의 max-width와 동일하게 설정 */
  padding: 12px 8px;
  display: flex;
  justify-content: center;
`;

const TMISTtyle = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  text-align: center;
  color: #6d6d6d;
  font-size: 0.9em;
  justify-content: center;
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};

  img {
    width: 1.3em;
    margin-right: 5px;
  }
`;
const GoTMI = styled.button`
  width: 90%;
  padding: 3%;
  max-width: 430px;
  font-weight: 400;
  font-size: 1.2em;
  background-color: ${theme.color.mainColor};
  color: #fff;
  border-radius: 10px;
  margin: auto;
  align-items: center;
`;

export default Introduce;
