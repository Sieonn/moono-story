import styled from 'styled-components';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import Contents from '../components/css/Contents';
import { modeAtom } from 'recoil/modeAtom';
import { useRecoilValue } from 'recoil';

const StartQuiz = () => {
  const isDarkMode = useRecoilValue(modeAtom);

  return (
    <Container isDarkMode={isDarkMode}>
      <Toptext>
        <span style={{ fontSize: '16px', fontWeight: '200', margin: '20px 0' }}>
          내 <span style={{ color: '#9ffb4b' }}>이야기</span> 들어줄래?
        </span>
        <div
          style={{
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '500',
            margin: '20px 0',
            lineHeight: '25px',
          }}
        >
          <div>
            <span style={{ color: '${theme.color.mainColor}' }}>당신</span>에게
            들려주는
          </div>
          <div
            style={{
              fontSize: '24px',
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
          src={`${process.env.PUBLIC_URL}/images/intro/HotPink.png`}
          alt="Hot Pink"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/intro/LogoLess2.png`}
          alt="Logo"
        />
      </ImgContainer>
    </Container>
  );
};
export default StartQuiz;
const ImgContainer = styled.div`
  position: relative; /* 이미지 겹치기 위한 기준점 */
  width: 400px; /* 필요한 경우 너비 조정 */
  height: 400px; /* 필요한 경우 높이 조정 */
  flex: 1;
  min-height: 400px; /* 최소 높이 지정 */
  img {
    position: absolute; /* 이미지가 겹치도록 설정 */
    width: 100%; /* 이미지를 같은 크기로 설정 */
    height: auto;
    top: 0;
    left: 0;
  }

  /* HotPink 이미지에 애니메이션 적용 */
  img:nth-child(1) {
    z-index: 1; /* 첫 번째 이미지 아래쪽 */
    top: 10%;
  }

  img:nth-child(2) {
    z-index: 2; /* 두 번째 이미지 위쪽 */
    width: 350px;
    height: auto;
    left: 10%;
  }
`;
const Toptext = styled.div`
  margin: 160px 0 0 0;
  text-align: center;
`;
