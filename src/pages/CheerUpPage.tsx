import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import Header from '../components/form/Header';
import Container from '../components/css/Container';
import BoardInput from '../components/form/BoardInput';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { GetBoardAPI, PostBoardAPI, DeleteBoardAPI } from 'api/BoardAPI';
import Contents from '../components/css/Contents';
import theme from 'styles/theme';
import { UserInfoAPI } from '../api/UserInfoAPI';
import { StampAPI } from 'api/StampAPI';
import { modeAtom } from 'recoil/modeAtom';

const CheerUpPage: React.FC = () => {
  const [stampStatus, setStampStatus] = useState({
    id: '',
    nickName: '',
    oneMission: false,
    twoMission: false,
    threeMission: false,
    fourMission: false,
    fiveMission: false,
  });
  const [st, setSt] = useState(false);
  const [user] = useRecoilState(userAtom);
  const [textList, setTextList] = useState([]);
  const [postText, setPostText] = useState({
    userId: user.sub,
    content: '',
    title: user.nickName,
  });
  const [refresh, setRefresh] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [isDarkMode] = useRecoilState(modeAtom);

  useEffect(() => {
    if (user && user.sub) {
      UserInfoAPI(user.sub)
        .then((data) => {
          setStampStatus({
            id: data.id,
            nickName: data.nickName,
            oneMission: data.oneMission,
            twoMission: data.twoMission,
            threeMission: data.threeMission,
            fourMission: data.fourMission,
            fiveMission: data.fiveMission,
          });
        })
        .catch((error) => {
          console.error('유저 정보 API 호출 실패:', error);
        });
    }
  }, [st]);

  useEffect(() => {
    if (st) {
      StampAPI(stampStatus)
        .then(() => {
          alert('무너응원하기 미션 완료 !');
        })
        .catch((error) => {
          console.error('스템 API 호출 실패:', error);
        });
    }
  }, [st]);

  useEffect(() => {
    if (user && user.nickName) {
      setPostText({
        ...postText,
        title: user.nickName,
        userId: user.sub,
      });
    }
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      const data = await GetBoardAPI();
      setTextList(data);
    };
    getData();
  }, [refresh]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [textList]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText({
      ...postText,
      content: e.target.value,
    });
  };

  const onClickInputBtn = async () => {
    if (stampStatus.threeMission === false) {
      setStampStatus({ ...stampStatus, threeMission: true });
      setSt(true);
    }
    try {
      await PostBoardAPI(postText);
      setRefresh(!refresh);
      setPostText({ ...postText, content: '' });
    } catch (error) {
      console.error('에러입니다:', error);
    }
  };

  const onClickDeleteBtn = async (postId: any) => {
    try {
      await DeleteBoardAPI(postId);
      setRefresh(!refresh);
    } catch (error) {
      console.error('에러입니다:', error);
    }
  };

  return (
    <Container
      style={{ backgroundColor: 'black', color: '#fff' }}
      isDarkMode={isDarkMode}
    >
      <Header
        iconSrc={`${process.env.PUBLIC_URL}/images/header/whiteBack.png`}
        bgColor={isDarkMode ? '#121212' : '#121212'}
      >
        {'무너 응원하기'}
      </Header>
      <Contents
        isDarkMode={isDarkMode}
        style={{ backgroundColor: '#121212', color: '#fff', height: '100%' }}
      >
        <ImgArea>
          <img
            src={`${process.env.PUBLIC_URL}/images/cheerup/cheer.png`}
            alt="무퀴즈"
            style={{ width: '100%' }}
          />
        </ImgArea>
        <Title>
          <span style={{ color: '#ffd900' }}>응원</span>의 한마디
        </Title>
        <BoardArea>
          {textList.map((data: any, idx) => (
            <TextLine
              key={idx}
              ref={idx === textList.length - 1 ? lastMessageRef : null}
            >
              <span>
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: `${theme.color.pointColor}`,
                  }}
                >
                  {data.title}{' '}
                </span>
                <span style={{ fontWeight: '500', fontSize: '12px' }}>
                  : {data.content}{' '}
                </span>
              </span>
              {data.userId === user.sub && (
                <TrashButton onClick={() => onClickDeleteBtn(data.postId)} />
              )}
            </TextLine>
          ))}
        </BoardArea>
        <InputArea2>
          <BoardInput onChange={onChangeText} value={postText.content} />
          <InputBtn onClick={onClickInputBtn}>입력</InputBtn>
        </InputArea2>
      </Contents>
    </Container>
  );
};

const TrashButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TrashBtnContainer onClick={onClick}>
      <img
        src={`${process.env.PUBLIC_URL}/images/cheerup/${isHovered ? 'trash2.png' : 'trash.png'}`}
        alt="Delete"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </TrashBtnContainer>
  );
};

const TrashBtnContainer = styled.div`
  cursor: pointer;
  margin-left: 10px;
  img {
    width: 15px;
  }
`;

const ImgArea = styled.div`
  margin-top: 14%;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 1.6em;
  font-weight: 700;
  margin-bottom: 2%;
  text-align: center; // 제목 가운데 정렬
`;

const BoardArea = styled.div`
  width: 85%; // 반응형을 위해 너비 조정
  height: 40%;
  max-height: 300px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  margin: 0 auto; // 가운데 정렬

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향으로 정렬
  margin-bottom: 20px;
  align-items: center; // 아이템 가운데 정렬
`;

const InputArea2 = styled(InputArea)`
  width: 90%; // 전체 너비 사용
  flex-direction: row; // 가로 방향으로 변경
`;

const InputBtn = styled.div`
  width: 10%;
  display: flex; // flexbox 사용
  justify-content: center; // 가로 방향 가운데 정렬
  align-items: center; // 세로 방향 가운데 정렬
  cursor: pointer;
  padding: 0 15px; // 충분한 패딩을 주어 클릭 영역을 늘림
  /* margin-left: 10px; */
  background-color: ${theme.color.mainColor}; // 기본 배경색 추가
  border-radius: 5px; // 테두리 둥글게
  height: 35px; // 버튼 높이를 늘림
  font-size: 14px; // 글자 크기 조정
  color: white; // 텍스트 색상 설정
  transition: background-color 0.3s; // 마우스 오버 시 효과 추가
`;

const TextLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export default CheerUpPage;
