import React from 'react';
import Header from '../components/form/Header';
import Container from '../components/css/Container';
import Contents from '../components/css/Contents';
import styled from 'styled-components';
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
  const [currentBg, setCurrentBg] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [text, setText] = useState('');
  const [mainImage] = useImage(mainChar[currentChar]);
  const stageRef: any = useRef(null);
  const [imagePosition, setImagePosition] = useState({ x: 40, y: 15 });
  const [textPosition, setTextPosition] = useState({ x: 30, y: 20 });
  const [fontSize, setFontSize] = useState(28);
  const [user] = useRecoilState(userAtom);
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
    if (newX < -223) newX = -56;
    if (newY < -223) newY = -24;
    if (newX > 358) newX = 182;
    if (newY > 250) newY = 52;
    setImagePosition({ x: newX, y: newY });
  };

  const saveImageFIle = () => {
    const uri = stageRef.current.toDataURL();
    saveAs(uri, 'moono_image.png');
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

  const onClickImgBg = (e: any) => {
    setCurrentBg(e.target.getAttribute('data-name'));
  };

  const onClickImgChar = (e: any) => {
    setCurrentChar(e.target.getAttribute('data-name'));
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  // 텍스트 크기 조절 핸들러
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10)); // 텍스트 크기 변경
  };

  return (
    <Container
      isDarkMode={isDarkMode}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '820px',
      }}
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
      <Contents
        isDarkMode={isDarkMode}
        style={{ flex: 1, paddingTop: '20%', justifyContent: 'flex-start' }}
      >
        <div
          style={{
            fontSize: '1.2em',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '5%',
            lineHeight: '1.5',
          }}
        >
          <span
            style={{ color: `${theme.color.mainColor}`, fontWeight: '600' }}
          >
            나만의 무너
          </span>
          를 만들고 자랑하기
          <div style={{ fontSize: '0.6em', fontWeight: '400' }}>
            자유롭게 이동시켜서 저장해보세요
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `10px solid ${theme.color.mainColor}`,
            width: '87%',
            maxWidth: '340px',
          }}
        >
          <Stage width={340} height={260} ref={stageRef}>
            <Layer>
              <Rect
                width={340}
                height={360}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: 0, y: 360 }}
                fillLinearGradientColorStops={[
                  0.17,
                  mainImg[currentBg],
                  0.85,
                  '#FFFFFF',
                ]}
              />
              <Text
                text={text}
                width={290}
                fontSize={fontSize}
                x={textPosition.x}
                y={textPosition.y}
                wrap="word"
                fill="black"
                draggable
                onDragMove={handleTextDragMove}
                onDragEnd={handleTextDragEnd}
                fontFamily="Cafe24Ssurround"
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
        <div style={{ width: '100%' }}>
          <InputContainer style={{ border: 'none' }}>
            <div
              style={{
                display: 'flex',
                whiteSpace: 'pre',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <label htmlFor="fontSize" style={{ width: '100%' }}>
                텍스트 크기:{' '}
              </label>
              <InputStyled
                type="range"
                id="fontSize"
                value={fontSize}
                onChange={handleFontSizeChange} // 폰트 크기 변경
                isDarkMode={isDarkMode}
              />
            </div>
            <div></div>
          </InputContainer>
          <InputContainer>
            <InputStyled onChange={onChangeText} isDarkMode={isDarkMode} />
            <RegistBtn onClick={saveImageFIle}>이미지 저장</RegistBtn>
          </InputContainer>
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
                    height: '11vh',
                  }}
                  data-name={img.name}
                  onClick={onClickImgBg}
                />
              ))}
            </AlbumImgListArea>
          </AlbumArea>
          <AlbumArea>
            <AlbumTitle>캐릭터</AlbumTitle>
            <AlbumImgListArea style={{ marginBottom: '3%' }}>
              {charList.map((img, idx) => (
                <img
                  key={idx}
                  src={img.address}
                  alt=""
                  style={{
                    cursor: 'pointer',
                    width: '92.5px',
                    height: '11vh',
                  }}
                  data-name={img.name}
                  onClick={onClickImgChar}
                />
              ))}
            </AlbumImgListArea>
          </AlbumArea>
        </div>
      </Contents>
    </Container>
  );
};

export default FourCutPage;

const AlbumArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  margin-top: 3%;
  width: 90%;
`;
const InputContainer = styled.div`
  width: 75%;
  border: 1px solid #924949;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  /* padding: 1%; */
  margin-top: 3%;
  &:focus {
    outline: none;
  }
`;
const InputStyled = styled.input<{ isDarkMode: boolean }>`
  margin: 0 auto;
  flex: 1;
  padding: 2%;
  border: none;
`;
const RegistBtn = styled.button`
  color: #fff !important;
  background-color: ${theme.color.mainColor} !important;
  width: 25%;
  height: 100%;
  border-radius: 0px 4px 4px 0px !important;
  /* border-radius: 5px !important; */
  z-index: 3;
  padding: 3%;
  white-space: pre;
`;

const AlbumTitle = styled.div`
  width: 90%;
  height: auto;
  align-items: center;
  font-size: 1em;
  font-weight: 400;
  /* color: #000000; */
  border-bottom: 2px solid #dfdfdf;
  padding: 2%;
  margin: 0 auto;
  margin-bottom: 1vh;
`;

const AlbumImgListArea = styled.div`
  display: flex;
  justify-content: center;
  /* width: 35vh; */
  width: 90%;
  gap: 1%;
  margin: 2% auto 0 auto;
`;
