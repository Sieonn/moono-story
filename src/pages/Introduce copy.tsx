import styled from 'styled-components';
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';
import Contents from '../components/css/Contents';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import { modeAtom } from 'recoil/modeAtom';
import { useRecoilState } from 'recoil';

export const Introduce = (props: any) => {
  const [isDarkMode] = useRecoilState(modeAtom);
  return (
    <div
      style={{
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Header>{'무너 소개서'}</Header>

      <Container
        style={{
          overflowY: 'scroll',
          background:
            'linear-gradient(180deg, rgba(255,255,255,1) 24%, rgba(243,224,136,1) 100dvh)',
          padding: '5% 0',
        }}
        isDarkMode={isDarkMode}
      >
        <CenterImg>
          <img
            src={`${process.env.PUBLIC_URL}/images/moono/하이무너.png`}
            style={{ height: '100%', margin: 'auto' }}
          />
        </CenterImg>
        <TextSection>
          <ListConta>
            <ListTitle>직업</ListTitle>
            <ListText>회사원,크리에이터,스트릿 아티스트</ListText>
          </ListConta>
          <ListConta>
            <ListTitle>출생지</ListTitle>
            <ListText>용궁</ListText>
          </ListConta>
          <ListConta>
            <ListTitle>신체</ListTitle>
            <ListText>50cm,10kg</ListText>
          </ListConta>
          <ListConta>
            <ListTitle>좋아하는 것</ListTitle>
            <ListText>
              무말랭이,정시퇴근,업무칭찬,댄스, 무너굿즈 외 41만 가지
            </ListText>
          </ListConta>
          <ListConta>
            <ListTitle>싫어하는 것</ListTitle>
            <ListText>
              해신탕, 타코야끼, 팩트폭행, 홀맨이 더 관심받는 것
            </ListText>
          </ListConta>
          <ListConta>
            <ListTitle>MBTI</ListTitle>
            <ListText>ENTJ</ListText>
          </ListConta>
          <p style={{ margin: '20px 10px', lineHeight: '1.5' }}>
            갓생을 꿈꾸는 엘리트 신입 사원 무너 그리고 홀맨 크루 거대한 용궁에서
            유복한 삶을 살다가, 용궁에서의 금수저 무너생을 뒤로하고 육지로
            올라와 현생을 살던 중 슈퍼스타 홀맨을 만나게 된다.
            <br /> 홀맨보다 유명해져서 홀맨을 짓밟고자 여러 번 도전했지만,
            현재까지 이긴 적은 한번도 없다고 알려져 있다. 슈퍼스타 홀맨의 바쁜
            스케줄로 무너가 트렌드 잘.알로서 새롭게 인스타그램 운영을 맡으며
            사회생활을 시작하게 되었다. 넘치는 상상력으로 팀장님께 건의하는
            아이디어 대부분이 반려되지만 때론, 현실이 되어 일상을 바꾸기도 한다.
            <br />
            "내가 쟤보다 낫다.”라는 마인드로 눈치보지 않고 할말은 다 하는 성격의
            소유자이다. 현재 도전하는 일마다 성공하며 점점 무너의 진가를
            발휘하고 있으며, “나의 라이벌은 오직 나 자신뿐.. 오늘도 내가 나를
            이긴다.”는 발언을 한 바가 있다.
            <br /> "무너지지마"를 외치다 최근에는 ‘아무너케’, ‘걍생 라이프’를
            즐기고 있다.
          </p>
        </TextSection>
      </Container>
    </div>
  );
};
const CenterImg = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  height: 40%;

  margin-top: 50%;
`;
const TextSection = styled.div`
  width: 90%;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers items horizontally */
  margin: 0 auto;
  line-height: 1.7;
  background-color: rgba(187, 13, 13, 0.1); /* 요소를 반투명 처리 해준 후 */
  backdrop-filter: blur(15px);
  /* 요소 뒤에서 효과 적용 */
  padding: 5% 0;
`;

const ListConta = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; /* Centers the items in the ListConta */
  margin: 0 auto;
  align-items: center; /* Centers items vertically */
`;
const ListTitle = styled.div`
  width: 100px;
  text-align: left;
  font-weight: 600;
`;
const ListText = styled.div`
  width: 250px;
  text-align: left;
  font-size: 12px;
`;
