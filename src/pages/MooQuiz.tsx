import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import Contents from '../components/css/Contents';
import theme from 'styles/theme';
import QuizData from '../assets/quiz.json';
import { useNavigate } from 'react-router-dom';
import { userAtom } from 'recoil/userAtom';
import { useRecoilState } from 'recoil';
import { UserInfoAPI } from '../api/UserInfoAPI';
import { StampAPI } from 'api/StampAPI';
import { modeAtom } from 'recoil/modeAtom';

const MooQuiz = () => {
  const navigate = useNavigate();
  const [quizIndex, setQuizIndex] = useState(0); // 현재 퀴즈 인덱스
  const [score, setScore] = useState(0); // 맞은 개수
  const [showResult, setShowResult] = useState(false); // 결과 화면 여부
  const quiz = QuizData.quiz;
  const [isDarkMode] = useRecoilState(modeAtom);
  const DarkMode = localStorage.getItem('darkMode');

  const [user, setUser] = useRecoilState(userAtom);
  const [stampStatus, setStampStatus] = useState({
    id: '',
    nickName: '',
    oneMission: false,
    twoMission: false,
    threeMission: false,
    fourMission: false,
    fiveMission: false,
  });

  useEffect(() => {
    if (user && user.sub) {
      // 유저 정보 API 호출
      UserInfoAPI(user.sub)
        .then((data) => {
          setStampStatus({
            id: data.id,
            nickName: data.nickName,
            oneMission: data.oneMission,
            twoMission: true,
            threeMission: data.threeMission,
            fourMission: data.fourMission,
            fiveMission: data.fiveMission,
          });
        })
        .catch((error) => {
          console.error('유저 정보 API 호출 실패:', error);
        });
    }
  }, []);

  // useEffect(() => {
  //   // 카카오톡 SDK 초기화
  //   window.Kakao.init('YOUR_APP_KEY'); // 자신의 카카오 앱 키로 변경
  // }, []);

  const handleAnswerClick = (optionIndex: number) => {
    // 정답인지 확인
    if (optionIndex === quiz[quizIndex].answer) {
      setScore(score + 1); // 정답일 경우 점수 증가
    }

    // 마지막 문제인지 확인
    if (quizIndex < quiz.length - 1) {
      setQuizIndex(quizIndex + 1); // 다음 문제로 이동
    } else {
      setShowResult(true); // 결과 화면 표시
    }
  };
  // const handleShareClick = () => {
  //   const shareUrl = 'https://yourwebsite.com/quiz'; // 공유할 URL
  //   const shareText = `무퀴즈를 푸세요! 총 ${quiz.length}문제 중 ${score}문제를 맞췄어요!`;

  //   window.Kakao.Share.sendDefault({
  //     objectType: 'feed',
  //     content: {
  //       title: '무퀴즈',
  //       description: shareText,
  //       imageUrl: `${process.env.PUBLIC_URL}/images/quiz/Desertisland.png`,
  //       link: {
  //         webUrl: shareUrl,
  //         mobileWebUrl: shareUrl,
  //       },
  //     },
  //     buttons: [
  //       {
  //         title: '바로가기',
  //         link: {
  //           webUrl: shareUrl,
  //           mobileWebUrl: shareUrl,
  //         },
  //       },
  //     ],
  //   });
  // };
  const goToMain = () => {
    // 스템 API 호출
    StampAPI(stampStatus)
      .then((data) => {
        console.log('스템 API 호출 성공:', data);
        alert('무퀴즈 미션 완료 !');
        window.location.href = '/main';
      })
      .catch((error) => {
        console.error('스템 API 호출 실패:', error);
      });
  };

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
        무퀴즈
      </Header>
      <Contents isDarkMode={isDarkMode} style={{ justifyContent: 'center' }}>
        {showResult ? (
          <ResultContainer>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '85%',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '1.4em',
                  marginBottom: '10px',
                  color: `${theme.color.mainColor}`,
                }}
                onClick={goToMain}
              >
                퀴즈 종료
              </div>
              <ResultText
                isDarkMode={isDarkMode}
                style={{
                  fontWeight: '700',
                }}
              >
                총 {quiz.length}문제 중{' '}
                <span style={{ color: `${theme.color.mainColor}` }}>
                  {score}
                  문제
                </span>
                를 맞췄어요!
              </ResultText>
            </div>
            <MainBtn onClick={goToMain}>미션 완료!</MainBtn>
          </ResultContainer>
        ) : (
          <MQuizContainer>
            <div
              style={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '6%',
              }}
            >
              <div
                style={{
                  margin: '0 auto',
                  display: 'flex',
                  textAlign: 'center',
                  fontSize: '36px',
                  alignItems: 'flex-end',
                  color: `${theme.color.mainColor}`,
                }}
              >
                <span>{quizIndex + 1}</span>
                <span
                  style={{
                    fontSize: '14px',
                    justifyContent: 'flex-end',
                    marginBottom: '5px',
                    color: '#afafaf',
                  }}
                >
                  / {quiz.length}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '1.5em',
                  padding: '10px',
                  margin: '0 auto',
                  height: '50px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {quiz[quizIndex].question}
              </div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/images/quiz/Desertisland.png`}
              style={{ width: '150px', margin: '7% auto' }}
              alt="quiz illustration"
            />
            <div style={{ margin: '0 auto', display: 'flex', gap: '15px' }}>
              {quiz[quizIndex].options.map((option: string, index: number) => (
                <QuizBtn
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  style={{
                    color:
                      index === quiz[quizIndex].answer
                        ? `${theme.color.mainColor}`
                        : 'white',
                    backgroundColor:
                      index === quiz[quizIndex].answer
                        ? '#f7f7f7'
                        : `${theme.color.mainColor}`,
                  }}
                >
                  {option}
                </QuizBtn>
              ))}
            </div>
          </MQuizContainer>
        )}
      </Contents>
    </Container>
  );
};

export default MooQuiz;
const ResultText = styled.div<{ isDarkMode: any }>`
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
`;

const MQuizContainer = styled.div`
  width: 100%;
  height: 85%;
  /* padding: 5% 0; */
  font-family: Cafe24Ssurround;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
`;

const QuizBtn = styled.button`
  font-family: Cafe24Ssurround;
  width: 150px;
  height: 200px;
  border-radius: 20px;
  box-shadow:
    0 10px 20px rgba(37, 37, 37, 0.05),
    0 6px 10px rgba(0, 0, 0, 0.158);
  color: white;
  font-size: 24px;
  font-weight: 800;
  background-color: ${theme.color.mainColor};
  &&:hover {
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.2),
      0 6px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ResultContainer = styled.div`
  width: 90%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  color: ${theme.color.mainColor};
  font-weight: 900;
  margin-top: 16%;
`;
const MainBtn = styled.button`
  display: flexbox;
  width: 90%;
  background-color: ${theme.color.mainColor};
  cursor: pointer;
  color: #fff;
  /* z-index: 100000; */
  text-align: center;
  margin: auto;
  align-items: end;
  padding: 3%;
  font-weight: 700;
  font-size: 1em;
  border-radius: 15px;
`;
