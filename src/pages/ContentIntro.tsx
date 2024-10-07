import Container from '../components/css/Container';
import styled from 'styled-components';
import theme from '../styles/theme';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/form/Header';

export const ContentIntro = (props: any) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const DarkMode = localStorage.getItem('darkMode') === 'true';
  // id에 따라 이미지 경로를 변경
  const getImageSrc = () => {
    switch (id) {
      case 'introduce':
        return `${process.env.PUBLIC_URL}/images/moono/하이무너.png`;
      case 'mooQuiz':
        return `${process.env.PUBLIC_URL}/images/moono/헤드셋무너.png`;
      case 'cheerup':
        return `${process.env.PUBLIC_URL}/images/moono/눕무너.png`;
      case 'fourcut':
        return `${process.env.PUBLIC_URL}/images/moono/심쿵무너.png`;
      case 'fortune':
        return `${process.env.PUBLIC_URL}/images/moono/머쓱무너.png`;
    }
  };

  const getText = () => {
    switch (id) {
      case 'introduce':
        return ['무너를 소개해줄게', '무너톡', '나를 소개할게✋🏻'];
      case 'mooQuiz':
        return ['퀴즈를 풀어볼까?', '무 퀴즈~?!', 'MOO Quiz?'];
      case 'cheerup':
        return ['무너를 응원해줘!', '힘내 무너!', '힘내라힘!!!'];
      case 'fourcut':
        return ['나만의 무너 짤방 만들기', '무너짤', 'like 찰칵'];
      case 'fortune':
        return [
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ marginBottom: '1%' }}>오늘의 운세가 궁금해?</span>
            <span>
              <span style={{ color: `${theme.color.mainColor}` }}>무너</span>가
              알려줄게!
            </span>
          </div>,
          '무너보살',
          '두근두근',
        ];
      default:
        return ['', ''];
    }
  };
  const handleStartButton = () => {
    navigate(`/${id}`);
  };
  return (
    <Container isDarkMode={DarkMode}>
      <Header
        iconSrc={
          DarkMode
            ? `${process.env.PUBLIC_URL}/images/header/whiteBack.png`
            : `${process.env.PUBLIC_URL}/images/header/blackBack.png`
        }
        bgColor={DarkMode ? '#20232a' : '#fff'}
      >
        {''}
      </Header>
      <div
        style={{
          height: '100%',
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
          width: '100%',
          marginBottom: '10%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '0.5em',
            marginTop: '20%',
          }}
        >
          <div>{getText()[0]}</div>
          <div
            style={{
              fontFamily: 'pretendard',
              fontSize: '28px',
              fontWeight: '900',
              marginBottom: '15%',
            }}
          >
            {getText()[1]}
          </div>
          <div style={{ color: `${theme.color.mainColor}`, marginTop: '10%' }}>
            {getText()[2]}
          </div>
        </div>
        <BackImg>
          <img
            src={getImageSrc()}
            alt="Logo"
            style={{ width: '50%', margin: '10%' }}
          />
        </BackImg>
        <ContentButtonStyle onClick={() => handleStartButton()}>
          시작하기
        </ContentButtonStyle>
      </div>
    </Container>
  );
};
const ContentButtonStyle = styled.button`
  display: flex;
  width: 90%;
  height: 7%;
  min-height: 60px;
  background-color: ${theme.color.mainColor};
  /* border: 1px solid ${theme.color.mainColor}; */
  border-radius: 10px;
  color: white;
  z-index: 2;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.5em;
  top: 10%;
`;
const BackImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
