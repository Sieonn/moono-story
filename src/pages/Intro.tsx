import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Container from '../components/css/Container';
import theme from '../styles/theme';
import { modeAtom } from 'recoil/modeAtom';
import { useRecoilState } from 'recoil';

const Intro = () => {
  const navigate = useNavigate();
  const [isDarkMode] = useRecoilState(modeAtom);
  return (
    <Container
      style={{
        height: '100dvh',
        backgroundColor: '#171717',
        color: '#fff',
        position: 'relative',
      }}
      isDarkMode={isDarkMode}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '85%',
        }}
      >
        <div>
          <Toptext>
            <span style={{ fontSize: '16px', fontWeight: '500', top: '10%' }}>
              내 <span style={{}}>이야기</span> 들어줄래?
            </span>
            <div
              style={{
                textAlign: 'center',
                fontSize: '1.4em',
                fontWeight: '500',
                margin: '2vh 0',
                lineHeight: '4vh',
              }}
            >
              <div>
                <span style={{ color: `${theme.color.mainColor}` }}>당신</span>
                에게 들려주는
              </div>
              <div
                style={{
                  fontSize: '1.1em',
                  color: '${theme.color.mainColor}',
                  fontWeight: '800',
                }}
              >
                무너 이야기
              </div>
            </div>
          </Toptext>

          <ImgContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/intro/redlogo.png`}
              alt="Hot Pink"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/intro/deco.png`}
              alt="Logo"
            />
          </ImgContainer>
        </div>
      </div>
      <div style={{ height: '15%' }}>
        <StartButton
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인하기
        </StartButton>
      </div>
    </Container>
  );
};

export default Intro;

// bounce-in-top 애니메이션 정의
const bounceInTop = keyframes`
  0% {
    transform: translateY(-50vh);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-10vh);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-5vh);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-2vh);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
`;

// ImgContainer는 로고 이미지를 담는 컨테이너
const ImgContainer = styled.div`
  position: relative;
  width: 95dvw; /* 이미지를 뷰포트 너비의 60%로 설정 */
  /* height: 45dvh; */
  /* max-height: auto; */
  max-width: 430px; /* 최대 너비 400px */
  margin: auto; /* 가운데 정렬 */
  /* bottom: 5%; */

  img {
    margin: 0 auto;
    position: absolute;
    width: 100%; /* 컨테이너의 100% 너비를 가짐 */
    /* margin: auto; */
    height: auto;
    top: 0;
    left: 0;
  }

  /* HotPink 이미지에 애니메이션 적용 */
  img:nth-child(1) {
    z-index: 1;
    /* top: 15%; */
    width: 100%;
    animation: ${bounceInTop} 1.1s both;
    mix-blend-mode: hard-light;
  }

  /* 로고 이미지 */
  img:nth-child(2) {
    position: relative;
    z-index: 2;
    width: 70%; /* 로고 이미지는 컨테이너의 80% 너비로 설정 */
    max-width: 400px; /* 최대 너비 300px */
    height: auto;
    left: 5%;
    margin-top: 11%;
  }
`;

const StartButton = styled.button`
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${theme.color.mainColor};
  height: 13%;
  border: none;
  border-radius: 30px 30px 0 0;
  font-size: 1.6em;
  font-weight: 600;
  color: #171717;
  text-align: center;
  justify-content: center;
  align-items: center;
  /* letter-spacing: 3px; */
  display: flex;

  cursor: pointer;
  &&:hover {
    color: #ffffff;
    font-weight: 900;
  }
`;

const Toptext = styled.div`
  margin: 3% 0;
  text-align: center;
`;
