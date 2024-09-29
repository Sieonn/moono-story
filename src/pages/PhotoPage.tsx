import React from 'react';
import Container from '../components/css/Container';
import Contents from '../components/css/Contents';
import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useState, useRef } from 'react';
import LoginBtn from '../components/form/LoginBtn';
import useImage from 'use-image';
import { saveAs } from 'file-saver';
import { Stage, Layer, Text, Image as KonvaImage, Image } from 'react-konva';
import Header from '../components/form/Header';
import { modeAtom } from 'recoil/modeAtom';
import { useRecoilState } from 'recoil';
const choiceList = [
  '육지가 넘무너무 궁금해',
  '순탄한 인생 싫어! 신나는 일 없나?',
  '엄마가 시켜서 ...',
]; // 선택지 리스트

const PhotoPage = () => {
  const stageRef = useRef<any>(null);
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isDarkMode] = useRecoilState(modeAtom);

  // 이미지를 로드
  const [image] = useImage(
    `${process.env.PUBLIC_URL}/images/main/둥둥무너2.png`
  );
  //텍스트 입력 함수
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //이미지 저장 함수
  const onSaveImgClick = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL(); // 현재 캔버스 상태를 이미지로 저장
      const link = document.createElement('a');
      link.download = 'image.png'; // 저장할 파일명
      link.href = uri;
      link.click(); // 다운로드 실행
      setImages([...images, uri]); // 저장된 이미지를 배열에 추가 (나중에 활용 가능)
      setText(''); // 텍스트 초기화
    }
  };

  return (
    <Container isDarkMode={isDarkMode}>
      {/* <Header title="무너네컷">
        <ArrowBackIosRoundedIcon
          sx={{ fontSize: '5vw', position: 'absolute' }}
        />
        <HeaderTitle>무너네컷</HeaderTitle>
      </Header> */}

      <CustomContents isDarkMode={isDarkMode}>
        <TitleQuestion>
          Q. 무너가 <SpanColor>육지</SpanColor>로 가고 싶은 이유는?{' '}
          {/* 이미지 변경시 사용 */}
        </TitleQuestion>
        <Stage
          width={window.innerWidth * 0.7}
          height={window.innerWidth * 0.7}
          ref={stageRef}
        >
          <Layer>
            {/* Konva의 Image 컴포넌트로 이미지 렌더링 */}
            <Image image={image} x={50} y={50} width={250} height={250} />
          </Layer>
        </Stage>
        <InputArea>
          <TextInput name="text" onChange={onChangeText} />
          <TextBtn onClick={onSaveImgClick}>등 록</TextBtn>
        </InputArea>
        <Line />
        <ListArea>
          {choiceList &&
            choiceList.map((data, idx) => {
              return (
                <div key={idx}>
                  <StyledChoiceBtn>{data}</StyledChoiceBtn>
                </div>
              );
            })}
        </ListArea>
      </CustomContents>
    </Container>
  );
};

export default PhotoPage;

const CustomHeader = styled(Header)`
  position: relative;
  padding: 4.1667vw;
  margin-bottom: 7.0833vw;
  font-size: 4.1667vw;
`;

const CustomContents = styled(Contents)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const HeaderTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin: 0 auto;
`;

const TitleQuestion = styled.div`
  font-family: 'Cafe24Ssurround';
  font-size: 5vw;
`;

const ImgArea = styled.img`
  width: 73vw;
  height: 70vw;
  margin-top: 9vw;
  border: 1px solid lightgray;
  margin-bottom: 4.375vw;
`;

const SpanColor = styled.span`
  color: #e947ae;
`;

const InputArea = styled.div`
  display: flex;
  width: 79vw;
  height: 8vw;
`;

const TextInput = styled.input`
  width: 64.58vw;
  height: 7.5vw;
  border-radius: 7px 0px 0px 7px;
  outline: none;
  border: 1px solid #000;
  border-right: none;
`;

const TextBtn = styled.button`
  background-color: #e947ae;
  color: #ffffff;
  font-weight: 700;
  font-size: 3.125vw;
  width: 14.58vw;
  height: 8.33vw;
  border-radius: 0px 7px 7px 0px;
`;

const Line = styled.div`
  width: 83.33vw;
  border: 1px solid #c7c7c7;
  margin-top: 3.9583vw;
`;

const ListArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 7.2917vw;
`;

const StyledChoiceBtn = styled(LoginBtn)`
  width: 80vw;
  height: 10.4167vw;
  font-size: 3.3vw !important; /* !important 적용 */
  margin-bottom: 2.0833vw !important;
`;
