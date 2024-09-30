import styled from 'styled-components';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';
import Stamp from '../components/css/Stamp';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import Contents from '../components/css/Contents';
import { UserInfoAPI } from 'api/UserInfoAPI';
import { modeAtom } from 'recoil/modeAtom';

export const StampPage = (props: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [stampStatus, setStampStatus] = useState({
    oneMission: false,
    twoMission: false,
    threeMission: false,
    fourMission: false,
    fiveMission: false,
  });
  const [isDarkMode] = useRecoilState(modeAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (user?.sub) {
        try {
          const data = await UserInfoAPI(user.sub);
          setStampStatus(data);
          setLoading(false);
        } catch (error) {
          console.error('데이터 가져오기 실패:', error);
          setLoading(false);
        }
      }
    };
    getData();
  }, [user]);

  const [stamps, setStamps] = useState([
    { id: 1, title: '무너 소개', completed: true },
    { id: 2, title: '무퀴즈', completed: true },
    { id: 3, title: '무너 응원', completed: true },
    { id: 4, title: '오늘 운세', completed: true },
    { id: 5, title: '무너 네컷', completed: true },
  ]);

  useEffect(() => {
    setStamps([
      { id: 1, title: '무너 소개', completed: stampStatus.oneMission },
      { id: 2, title: '무퀴즈', completed: stampStatus.twoMission },
      { id: 3, title: '무너 응원', completed: stampStatus.threeMission },
      { id: 4, title: '오늘 운세', completed: stampStatus.fourMission },
      { id: 5, title: '무너 네컷', completed: stampStatus.fiveMission },
    ]);
  }, [stampStatus]);

  // 미션 완료 함수
  const completeMission = (id: number) => {
    setStamps(
      stamps.map((stamp) =>
        stamp.id === id ? { ...stamp, completed: true } : stamp
      )
    );
  };

  // 모든 미션이 완료되었는지 확인하는 함수
  const allMissionsCompleted = () => {
    return stamps.every((stamp) => stamp.completed);
  };
  const handleApplyClick = () => {
    if (allMissionsCompleted()) {
      // 모든 미션이 완료된 경우에만 이동
      window.location.href = 'https://naver.me/5iTtQt3t';
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        안녕 난 로딩 중...
      </div>
    );
  }

  return (
    <StyledContainer isDarkMode={isDarkMode}>
      <StyledHeader
        iconSrc={
          isDarkMode
            ? `${process.env.PUBLIC_URL}/images/header/whiteBack.png`
            : `${process.env.PUBLIC_URL}/images/header/blackBack.png`
        }
        bgColor={isDarkMode ? '#20232a' : '#fff'}
      >
        {'미션진행도'}
      </StyledHeader>
      <StyledContents isDarkMode={isDarkMode}>
        <CoffeImgSection>
          <CoffeText>
            <div>
              <span style={{ color: `${theme.color.mainColor}` }}>무스</span>
              구경하고
            </div>
            <div>아메리카노 마시자!</div>
          </CoffeText>
          <img
            src={`${process.env.PUBLIC_URL}/images/stamp/coffeimga.png`}
            style={{ width: '80%' }}
          />
        </CoffeImgSection>
        <StampSection>
          <StampText>
            <div style={{ fontSize: '1.2em', fontWeight: '700' }}>
              미션을 완료하고 도장을 모아보세요.
            </div>
            <div style={{ fontSize: '0.8em', marginTop: '10px' }}>
              도장을 다 모으면 응모 가능해요!
            </div>
          </StampText>
          <StampArea>
            <StampRow>
              {stamps.slice(0, 3).map((stamp) => (
                <Stamp
                  key={stamp.id}
                  page={stamp.title}
                  completed={stamp.completed}
                />
              ))}
            </StampRow>
            <StampRow>
              {stamps.slice(3, 5).map((stamp) => (
                <Stamp
                  key={stamp.id}
                  page={stamp.title}
                  completed={stamp.completed}
                />
              ))}
            </StampRow>
          </StampArea>
        </StampSection>
        <ApplyButton
          onClick={handleApplyClick}
          disabled={!allMissionsCompleted()}
        >
          응모하기
        </ApplyButton>
      </StyledContents>
    </StyledContainer>
  );
};

// 스타일 수정 부분
const StyledContainer = styled(Container)<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? '#20232a' : '#ffffff'} !important;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'linear-gradient(180deg, #1a1a1a16 24%, rgba(223, 23, 33, 0.43) 100%)'
      : 'linear-gradient(180deg, rgba(255,212,93,0.42622986694677867) 24%, rgba(218,113,113,0.8379945728291316) 100%)'};
  min-height: 900px;
`;

const StyledHeader = styled(Header)`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 1.8em;
  background-color: ${theme.color.mainColor};
  color: white;
  z-index: 1;
`;

const StyledContents = styled(Contents)`
  padding-top: 20%;
  background-color: transparent;
`;

const CoffeImgSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  min-height: 350px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const CoffeText = styled.div`
  font-size: 1.8em;
  font-weight: 900;
  text-align: center;
  margin: 20px;
  margin-bottom: 5%;
`;

const StampSection = styled.div`
  width: 100%;
  font-weight: 400;
  align-items: center;
  height: 100%;
  margin-bottom: 0;
  padding-bottom: 5%;
`;

const StampText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const StampArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 5%;
`;

const StampRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 7px;
`;

const ApplyButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 10%;
  min-height: 70px;
  background-color: ${({ disabled }) =>
    disabled ? '#ccc' : theme.color.mainColor};
  color: #fff;
  font-size: 1.4em;
  margin-top: 0;
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed' : 'pointer'}; // 커서 스타일 변경
`;
