import React from 'react';
import Header from '../components/form/Header';
import Container from '../components/css/Container';
import Contents from '../components/css/Contents';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { saveAs } from 'file-saver';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { StampAPI } from 'api/StampAPI';
import { UserInfoAPI } from 'api/UserInfoAPI';
import { modeAtom } from 'recoil/modeAtom';
import theme from 'styles/theme';

const backgroundList = [
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷배경1.png`,
    name: 0,
  },
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷배경2.png`,
    name: 1,
  },
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷배경3.png`,
    name: 2,
  },
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷배경4.png`,
    name: 3,
  },
];

const charList = [
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷캐릭1.png`,
    name: 0,
  },
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷캐릭2.png`,
    name: 1,
  },
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷캐릭3.png`,
    name: 2,
  },
  {
    address: `${process.env.PUBLIC_URL}/images/moono/무생네컷캐릭4.png`,
    name: 3,
  },
];

const mainImg = ['#FFDF53', '#68CCFF', '#EA3636', '#EBEBEB'];

const mainChar = [
  `${process.env.PUBLIC_URL}/images/moono/무생네컷무너1.png`,
  `${process.env.PUBLIC_URL}/images/moono/무생네컷무너2.png`,
  `${process.env.PUBLIC_URL}/images/moono/무생네컷무너3.png`,
  `${process.env.PUBLIC_URL}/images/moono/무생네컷무너4.png`,
];

const FourCutPage = () => {
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [text, setText] = useState('');
  const [mainImage] = useImage(mainChar[currentChar]);
  // Konva zone startLine
  const stageRef: any = useRef(null);
  const [imagePosition, setImagePosition] = useState({ x: 70, y: 20 });
  const [textPosition, setTextPosition] = useState({ x: 50, y: 20 });

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

  const [isDarkMode] = useRecoilState(modeAtom);

  useEffect(() => {
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
            fourMission: data.fourMission,
            fiveMission: true,
          });
        })
        .catch((error) => {
          console.error('유저 정보 API 호출 실패:', error);
        });
    }
  }, [user]);

  const handleTextDragMove = (e: any) => {
    setTextPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleImageDragMove = (e: any) => {
    setImagePosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTextDragEnd = (e: any) => {
    console.log('Image position after drag:', {
      x: e.target.x(),
      y: e.target.y(),
    });
    let newX = e.target.x();
    let newY = e.target.y();
    if (newX < -223) newX = -56;
    if (newY < -223) newY = -24;
    if (newX > 358) newX = 182;
    if (newY > 250) newY = 52;

    setTextPosition({ x: newX, y: newY });
  };

  const handleImageDragEnd = (e: any) => {
    let newX = e.target.x();
    let newY = e.target.y();

    // 화면 경계에 맞춰 위치를 제한하는 로직
    if (newX < -223) newX = -56;
    if (newY < -223) newY = -24;
    if (newX > 358) newX = 182;
    if (newY > 250) newY = 52;
    setImagePosition({ x: newX, y: newY });
  };
  // 이미지 저장 겸 스탬프 저장하는 함수 있는 함수
  const saveImageFIle = () => {
    const uri = stageRef.current.toDataURL(); // Stage에서 데이터 URL 생성
    saveAs(uri, 'moono_image.png');
    // 스템 API 호출
    StampAPI(stampStatus)
      .then((data) => {
        console.log('스템 API 호출 성공:', data);
        alert('미션 완료 !');
        window.location.href = '/main';
      })
      .catch((error) => {
        console.error('스템 API 호출 실패:', error);
      });
  };

  // Konva zone endLine
  const onBackBtn = () => {
    navigate('/main');
  };

  const onClickImgBg = (e: any) => {
    setCurrentBg(e.target.getAttribute('data-name'));
  };
  const onClickImgChar = (e: any) => {
    setCurrentChar(e.target.getAttribute('data-name'));
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Container
      style={{ minWidth: '425px', overflowY: 'auto', height: '100%' }}
      isDarkMode={isDarkMode}
    >
      <Header
        iconSrc={
          isDarkMode
            ? `${process.env.PUBLIC_URL}/images/header/whiteBack.png`
            : `${process.env.PUBLIC_URL}/images/header/blackBack.png`
        }
        bgColor={isDarkMode ? '#20232a' : '#fff'}
      >
        {'무너만들기'}
      </Header>
      <Contents isDarkMode={isDarkMode} style={{ marginTop: '10%' }}>
        <div
          style={{
            marginTop: '13%',
            fontSize: '24px',
            // fontWeight: '600',
            textAlign: 'center',
            marginBottom: '5%',
          }}
        >
          나만의 무너를 만들고 <br /> 자랑해 보세요!
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stage width={420} height={280} ref={stageRef}>
            <Layer>
              <Rect
                width={420}
                height={280}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: 0, y: 280 }}
                fillLinearGradientColorStops={[
                  0.17,
                  mainImg[currentBg],
                  0.85,
                  '#FFFFFF',
                ]}
              />
              <Text
                text={text}
                width={340}
                fontSize={24}
                x={textPosition.x}
                y={textPosition.y}
                wrap="word"
                fill="black" // 텍스트 색상
                draggable
                onDragMove={handleTextDragMove}
                onDragEnd={handleTextDragEnd}
                fontFamily="establishRetrosansOTF"
              />
              <Image
                image={mainImage}
                x={imagePosition.x}
                y={imagePosition.y}
                draggable
                onDragMove={handleImageDragMove}
                onDragEnd={handleImageDragEnd}
              />
            </Layer>
          </Stage>
        </div>
        <InputArea>
          <TextInput onChange={onChangeText} isDarkMode={isDarkMode} />
          <TextRegistBtn variant="contained" onClick={saveImageFIle}>
            저장
          </TextRegistBtn>
        </InputArea>
        <AlbumArea>
          <AlbumTitle>배경</AlbumTitle>
          <AlbumImgListArea>
            {backgroundList.map((img, idx) => (
              <img
                key={idx}
                src={img.address}
                alt=""
                style={{
                  cursor: 'pointer',
                  width: '92.5px',
                  height: '10.5vh',
                }}
                data-name={img.name}
                onClick={onClickImgBg}
              />
            ))}
          </AlbumImgListArea>
        </AlbumArea>
        <AlbumArea>
          <AlbumTitle>캐릭터</AlbumTitle>
          <AlbumImgListArea>
            {charList.map((img, idx) => (
              <img
                key={idx}
                src={img.address}
                alt=""
                style={{
                  cursor: 'pointer',
                  width: '92.5px',
                  height: '10.5vh',
                }}
                data-name={img.name}
                onClick={onClickImgChar}
              />
            ))}
          </AlbumImgListArea>
        </AlbumArea>
      </Contents>
    </Container>
  );
};

export default FourCutPage;

const InputArea = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  &:focus {
    outline: none;
  }
`;

const AlbumArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  margin-top: 2vh;
`;

const TextRegistBtn = styled(Button)`
  color: #fff !important;
  background-color: #c43232 !important;
  width: 10%;
  height: 100%;
  border-radius: 0px 7px 7px 0px !important;
`;

const TextInput = styled(TextField)<{ isDarkMode: boolean }>`
  width: 75%;

  & .MuiInputBase-root {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? '#333' : '#ffffffed'}; // 다크 모드 배경색
    color: ${({ isDarkMode }) =>
      isDarkMode ? '#fff' : '#000'}; // 다크 모드 텍스트 색
    outline: none;
    height: 5% !important;
    border: none; // 기본 border 제거
    border-radius: 7px 0px 0px 7px;
    box-shadow: inset 0px -4px 3px ${({ isDarkMode }) => (isDarkMode ? 'rgba(32, 32, 32, 0.5)' : 'rgba(200, 200, 200, 0.5)')}; // 내부 쉐도우 추가

    &:focus {
      border: none; // 포커스 시에도 border 제거
      box-shadow: inset 0 4px 8px
        ${({ isDarkMode }) =>
          isDarkMode
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(200, 200, 200, 0.7)'}; // 포커스 시 내부 쉐도우 강조
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none; // 기본 아웃라인 제거
  }
`;

const AlbumTitle = styled.div`
  width: 80vw;
  max-width: 350px;
  font-size: 1.6vh;
  font-weight: 300;
  color: #6b6b6b;
  border-bottom: 1px solid #c7c7c7;
  padding: 1vh;
  margin: 0 auto;
  margin-bottom: 1vh;
`;

const AlbumImgListArea = styled.div`
  display: flex;
  justify-content: center;
  width: 35vh;
  gap: 1vh;
  margin: 0 auto;
`;
