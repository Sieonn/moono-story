import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import Contents from '../components/css/Contents';
import theme from 'styles/theme';
import styled, { keyframes } from 'styled-components';
import { userAtom } from 'recoil/userAtom';
import { useRecoilState } from 'recoil';
import Stamp from '../components/css/Stamp';
import { UserInfoAPI } from '../api/UserInfoAPI';
import { StampAPI } from 'api/StampAPI';
import { modeAtom } from 'recoil/modeAtom';

const Fortune: React.FC = (props: any) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [fortune, setFortune] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isResultPage, setIsResultPage] = useState(false); // 화면 전환을 위한 상태 추가
  const [randomImage, setRandomImage] = useState(''); // 랜덤 이미지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [st, setSt] = useState(false);
  const [isDarkMode] = useRecoilState(modeAtom);
  // 이미지 배열 준비 (임시 경로 예시)
  const images = [
    '/images/fortune/alien.png',
    '/images/fortune/Flower.png',
    '/images/fortune/clover.png',
    '/images/fortune/heart1.png',
    '/images/fortune/gheart.png',
    '/images/fortune/rhearts.png',
    '/images/fortune/whale.png',
    '/images/fortune/T-Rex.png',
  ];

  // 랜덤 이미지 선택 함수
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const [stampStatus, setStampStatus] = useState({
    id: '',
    nickName: '',
    oneMission: false,
    twoMission: false,
    threeMission: false,
    fourMission: false,
    fiveMission: false,
  });

  // 컴포넌트가 마운트될 때마다 랜덤 이미지를 설정
  useEffect(() => {
    const selectedImage = getRandomImage();
    setRandomImage(selectedImage);
  }, []);
  useEffect(() => {
    console.log('나 실행되고 있니 ..?');
    if (user && user.sub) {
      // 유저 정보 API 호출
      UserInfoAPI(user.sub)
        .then((data) => {
          setStampStatus({
            id: data.id,
            nickName: data.nickName,
            oneMission: data.oneMission,
            twoMission: data.twoMission,
            threeMission: data.threeMission,
            fourMission: true,
            fiveMission: data.fiveMission,
          });
        })
        .catch((error) => {
          console.error('유저 정보 API 호출 실패:', error);
        });
    }
  }, [st]);
  console.log(user);

  useEffect(() => {
    // 스템 API 호출
    if (st) {
      StampAPI(stampStatus)
        .then((data) => {
          console.log('스템 API 호출 성공:', data);
          alert('무너응원하기 미션 완료 !');
        })
        .catch((error) => {
          console.error('스템 API 호출 실패:', error);
        });
    }
  }, [user]);
  console.log(stampStatus);

  // 현재 날짜를 "YYYY년 MM월 DD일" 형식으로 포맷하는 함수
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
    const day = today.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const getFortune = async () => {
    if (gender === '') {
      alert('성별을 선택해주세요.');
      return;
    }

    if (!/^\d{8}$/.test(birthdate)) {
      alert('생년월일은 숫자로 8자를 입력해주세요.');
      return;
    }
    setIsLoading(true); // 로딩 시작
    // 스템 API 호출
    StampAPI(stampStatus)
      .then((data) => {
        console.log('스템 API 호출 성공:', data);
        alert('미션 완료 !');
      })
      .catch((error) => {
        console.error('스템 API 호출 실패:', error);
      });

    const currentDate = getCurrentDate(); // 현재 날짜 계산

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `성별은 ${gender}이고, 생년월일은 ${birthdate}, 오늘은 ${currentDate}인데,입력받은 생년월일 기반으로 오늘의 운세 결과를 솔직하게 반말로 출력. 운세 다음 줄바꿈하고 행운 점수 100점 만점기준으로 표시`,
            },
          ],
          max_tokens: 180,
          temperature: 0, //이 설정으로 일관된 답변 출력
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // OpenAI API의 응답에서 운세 텍스트를 추출해 상태에 저장
      setFortune(response.data.choices[0].message.content);
      setIsResultPage(true); // 결과 페이지로 전환
    } catch (error) {
      console.error('운세를 가져오는 중 오류 발생:', error);
      setFortune('운세를 가져오는 데 문제가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const resetForm = () => {
    setGender(''); // 성별 입력값 초기화
    setBirthdate(''); // 생년월일 입력값 초기화
    setIsResultPage(false); // 입력 화면으로 전환
  };

  // 공유하기 버튼 클릭 시 호출되는 함수
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: '오늘의 운세',
          text: `내 운세: ${fortune}`,
          url: window.location.href,
        })
        .then(() => console.log('공유 성공'))
        .catch((error) => console.log('공유 실패:', error));
    } else {
      alert('공유하기 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  // 메인으로 가기 버튼 클릭 시 호출되는 함수
  const handleGoToMain = () => {
    // 메인으로 이동 (React Router를 사용할 경우 useNavigate 사용)
    window.location.href = '/main'; // 메인 페이지 경로
  };
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setBirthdate(input);
    } else {
      alert('숫자만 입력할 수 있습니다.');
    }
  };
  // 운세 결과 화면
  if (isResultPage) {
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
          {'오늘의 운세 결과'}
        </Header>
        <Contents2 isDarkMode={isDarkMode}>
          <div style={{ height: '600px', maxHeight: '78%' }}>
            <ResultCard>
              <InnerCard>
                <CardImage src={randomImage} alt="icon" />
                <CardTitle>{user.nickName}님의 운세</CardTitle>
                <CardDescription
                  style={{ whiteSpace: 'pre-line', textAlign: 'left' }}
                >
                  {fortune}
                </CardDescription>
              </InnerCard>
            </ResultCard>
            <ButtonContainer style={{ padding: '0' }}>
              <RetryStyle onClick={resetForm}>♻️ 다시 해볼까요??</RetryStyle>
            </ButtonContainer>
          </div>
          <ButtonContainer style={{ width: '90%' }}>
            <ShareButton onClick={handleShare}>공유하기</ShareButton>
            <MainButton onClick={handleGoToMain}>메인으로 가기</MainButton>
          </ButtonContainer>
        </Contents2>
      </Container>
    );
  }

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
        {'오늘의 운세를 무너보살'}
      </Header>
      <Contents2 isDarkMode={isDarkMode}>
        <ImgSection>
          {' '}
          <GlowingImage
            src={`${process.env.PUBLIC_URL}/images/fortune/fortune.png`}
          />
        </ImgSection>
        <div
          style={{
            fontSize: '1.4em',
            fontFamily: 'Pretendard',
            fontWeight: '900',
            marginTop: '10px',
          }}
        >
          오늘 당신에게는 무슨 일이?
        </div>
        <div style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
          간단한 입력으로{' '}
          <span
            style={{ color: `${theme.color.mainColor} `, fontWeight: '600' }}
          >
            오늘의 운세
          </span>
          를 알아보세요.
        </div>
        <div style={{ width: '100%', margin: '20px auto 30px' }}>
          <InputContainer>
            <MiniTitle>성별</MiniTitle>
            <GenderButtonContainer>
              <GenderButton
                isSelected={gender === '남성'}
                onClick={() => handleGenderSelect('남성')}
              >
                남성
              </GenderButton>
              <GenderButton
                isSelected={gender === '여성'}
                onClick={() => handleGenderSelect('여성')}
              >
                여성
              </GenderButton>
            </GenderButtonContainer>
          </InputContainer>
          <InputContainer>
            <MiniTitle>생년월일</MiniTitle>
            <input
              type="text"
              value={birthdate}
              onChange={handleBirthdateChange}
              placeholder="생년월일 8자를 입력해주세요"
              maxLength={8} // 입력 글자 수를 8자로 제한
            />
          </InputContainer>
        </div>
        {isLoading ? (
          <LoadingMessage>운세를 불러오는 중...</LoadingMessage>
        ) : (
          <FortuneSubmit onClick={getFortune}>운세 보기</FortuneSubmit>
        )}
      </Contents2>
    </Container>
  );
};

export default Fortune;
const Contents2 = styled(Contents)<{ isDarkMode: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'linear-gradient(180deg, #0d093dc5 34%, #ff91c11a 100%)' // 다크 모드 배경
      : 'linear-gradient(180deg, rgba(255,212,93,0.42622986694677867) 24%, rgba(218,113,113,0.8379945728291316) 100%)'}; // 일반 모드 배경
  justify-content: flex-end;
  padding-bottom: 5%;
`;

// 빛이 퍼지는 애니메이션 정의
const glowAnimation = keyframes`
  0% {
    filter: drop-shadow(-20px 0px 30px rgba(255, 255, 255, 0.178))
            drop-shadow(20px 0px 30px rgba(255, 255, 255, 0.178));
  }
  50% {
    filter: drop-shadow(-45px 0px 50px rgba(128, 126, 255, 0.792)) 
            drop-shadow(45px 0px 50px rgba(128, 126, 255, 0.792));
  }
  100% {
    filter: drop-shadow(-20px 0px 30px rgba(255, 255, 255, 0.37)) 
            drop-shadow(20px 0px 30px rgba(255, 255, 255, 0.37));
  }
`;
const ImgSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 50%;
  margin: 3% auto 2%;
  position: relative;
`;

const GlowingImage = styled.img`
  width: 100%;
  position: relative;
  animation: ${glowAnimation} 4s infinite;

  margin: 5% 0;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.356);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    animation: ${glowAnimation} 4s infinite;
  }
`;
const InputContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 2% auto;
  gap: 10px;
  input {
    font-size: 1em;
    padding: 4%;
    border: none;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.49);
    &::placeholder {
      font-size: 0.9em;
    }
  }
`;
const MiniTitle = styled.div`
  font-size: 1.1em;
  color: #fff;
  margin-left: 10px;
`;
const FortuneSubmit = styled.button`
  font-family: 'Pretendard';
  width: 80%;
  color: ${theme.color.mainColor};
  background-color: #fff;
  font-size: 1.4em;
  font-weight: 900;
  padding: 3%;
  border-radius: 10px;
  margin: 0 auto;
`;
const ResultCard = styled.div`
  position: relative;
  width: 65%;
  max-width: 400px;
  padding: 10px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 20px;
  border: 3px double #fff;
  box-shadow: -5 -5px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid ${theme.color.mainColor};
`;

const CardImage = styled.img`
  width: 150px;
  height: 150px;
  margin: 20px auto;
`;

const CardTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardDescription = styled.div`
  font-size: 0.9em;
  line-height: 1.6;
  color: #555;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const ShareButton = styled.button`
  background-color: #fff; /* 검정색 배경 */
  color: ${theme.color.mainColor};
  font-size: 1.2em;
  padding: 3%;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  width: 49%;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 900;
`;

const MainButton = styled.button`
  font-weight: 900;
  background-color: #e74c3c; /* 빨간색 배경 */
  color: white;
  font-size: 1.2em;
  padding: 3%;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  width: 49%;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
`;
const RetryStyle = styled.div`
  font-family: 'Pretendard', sans-serif;
  width: 100%;
  font-size: 1.1em;
  text-align: center;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #1c1c1c;
  }
`;
const GenderButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? `#000` : '#fff')};
  color: ${(props) =>
    props.isSelected ? `${theme.color.pointColor}` : '#555'};
  padding: 2%;
  font-size: 1.2em;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  width: 47%;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? '#000000' : `${theme.color.pointColor}`};
    color: ${(props) =>
      props.isSelected ? `${theme.color.pointColor}` : '#000'};
  }
`;
// 로딩 메시지 스타일
const LoadingMessage = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  text-align: center;
  padding: 3%;
`;
