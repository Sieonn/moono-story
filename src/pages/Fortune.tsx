import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import Contents from '../components/css/Contents';

import Stamp from '../components/css/Stamp';
export const Fortune = (props: any) => {
  const [birthDate, setBirthDate] = useState(''); // 생년월일 상태
  const [gender, setGender] = useState(''); // 성별 상태
  const [horoscope, setHoroscope] = useState(''); // 운세 결과 상태

  // 운세 확인 버튼 클릭 핸들러
  const handleFortuneClick = () => {
    // 생년월일과 성별에 따른 운세를 생성 (이 부분을 AI 호출로 확장 가능)
    if (birthDate && gender) {
      const generatedHoroscope = `생년월일: ${birthDate}, 성별: ${gender}의 운세입니다!`; // 예시 운세
      setHoroscope(generatedHoroscope); // 운세 결과 설정
      console.log(generatedHoroscope);
    } else {
      setHoroscope('생년월일과 성별을 선택해주세요.');
    }
  };

  return (
    <Container>
      <Header bgColor="#fff">무너보살</Header>
      <Contents>
        <FormSection>
          <label htmlFor="birthDate">생년월일</label>
          <Input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <label>성별</label>
          <Select onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </Select>

          <FortuneButton onClick={handleFortuneClick}>운세 확인</FortuneButton>
        </FormSection>

        {horoscope && <HoroscopeResult>{horoscope}</HoroscopeResult>}
      </Contents>
    </Container>
  );
};

// 스타일 정의
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FortuneButton = styled.button`
  background-color: ${theme.color.mainColor};
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.color.pointColor};
  }
`;

const HoroscopeResult = styled.div`
  margin-top: 20px;
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
`;
