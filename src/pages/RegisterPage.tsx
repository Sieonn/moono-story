import { styled } from 'styled-components';
import Container from '../components/css/Container';
import RegistInput from '../components/form/RegistInput';
import LoginBtn from '../components/form/LoginBtn';
import { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useNavigate } from 'react-router-dom';
import { IdDuplicateAPI } from 'api/IdDuplicatge';
import { RegisterAPI } from 'api/RegisterAPI';
import theme from 'styles/theme';
import { modeAtom } from 'recoil/modeAtom';
import { useRecoilState } from 'recoil';
import Header from '../components/form/Header';
import { colors } from '@mui/material';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [registInfo, setRegistInfo] = useState({
    id: '',
    pwd: '',
    nickName: '',
  });

  const [isDarkMode] = useRecoilState(modeAtom);


  // 입력값 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistInfo({
      ...registInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 다음 단계로 이동
  const nextStep = (e: any) => {
    setStep(step + 1);
  };

  // 회원가입 완료 버튼
  const onRegistClick = async (e: any) => {
    try {
      const data = await RegisterAPI(registInfo); // 회원가입 API 호출
      alert(data);
      setStep(step + 1);
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 아이디 중복검사
  const idCheck = async (e: any) => {
    if (!registInfo.id) {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const data = await IdDuplicateAPI({ id: registInfo.id }); // 아이디 중복 체크 API 호출
      setStep(step + 1);
      console.log(data);
    } catch (error) {
      console.error('아이디 중복입니다.', error);
      alert('아이디 중복입니다. 다시 시도해주세요.');
    }
  };
  return (
    <Container style={{ paddingBottom: '120px' }} isDarkMode={isDarkMode}>
      <Header
        iconSrc={
          isDarkMode
            ? `${process.env.PUBLIC_URL}/images/header/whiteBack.png`
            : `${process.env.PUBLIC_URL}/images/header/blackBack.png`
        }
        bgColor={isDarkMode ? '#20232a' : '#fff'}
      >
        {''}
      </Header>
      <CheckArea>
        {step >= 2 && step < 4 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '10px',
              flexDirection: 'column',
              gap: '2px',
              opacity: '0.7',
              marginBottom: '3px',
            }}
          >
            <div>
              {'아이디'}
              <CheckRoundedIcon
                sx={{
                  fontSize: '16px',
                  color: '#34A853',
                  verticalAlign: 'middle',
                }}
              />
            </div>
            <CheckInfo>{registInfo.id}</CheckInfo>
          </div>
        )}
        {step === 3 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '10px',
              flexDirection: 'column',
              gap: '2px',
              marginTop: '5px',
              opacity: '0.7',
            }}
          >
            <div>
              {'비밀번호'}
              <CheckRoundedIcon
                sx={{
                  fontSize: '16px',
                  color: '#34A853',
                  verticalAlign: 'middle',
                }}
              />
            </div>
            <CheckInfo>확인 완료</CheckInfo>
          </div>
        )}
      </CheckArea>
      {step === 1 && (
        <>
          <TitleArea>아이디를 입력해주세요.</TitleArea>
          <CustomInput
            label="아이디"
            variant="standard"
            name="id"
            value={registInfo.id}
            onChange={handleChange}
            sx={{
              marginBottom: '20px',
            }}
            isDarkMode={isDarkMode}
          />
          <LoginBtn onClick={idCheck}>확인</LoginBtn>
        </>
      )}

      {step === 2 && (
        <>
          <TitleArea>비밀번호를 입력해주세요.</TitleArea>
          <CustomInput
            label="비밀번호"
            variant="standard"
            name="pwd"
            type="password"
            value={registInfo.pwd}
            onChange={handleChange}
            sx={{ marginBottom: '20px' }}
            isDarkMode={isDarkMode}
          />
          <LoginBtn onClick={nextStep}>확인</LoginBtn>
        </>
      )}

      {step === 3 && (
        <>
          <TitleArea>닉네임을 입력해주세요.</TitleArea>
          <CustomInput
            label="닉네임"
            variant="standard"
            name="nickName"
            value={registInfo.nickName}
            onChange={handleChange}
            sx={{ marginBottom: '20px' }}
            isDarkMode={isDarkMode}
          />
          <LoginBtn onClick={onRegistClick}>가입 완료</LoginBtn>
        </>
      )}
      {step === 4 && (
        <>
          <StepFourInfo>
            <div
              style={{
                textAlign: 'center',
                fontSize: '1.4em',
                fontWeight: '700',
              }}
            >
              회원가입 완료👍🏻
            </div>
            <span style={{ color: '${theme.color.mainColor}' }}>
              <span style={{ color: `${theme.color.mainColor}` }}>
                무너의 이야기
              </span>
              를
            </span>{' '}
            들어 볼까요?!
          </StepFourInfo>
          <LoginBtn
            onClick={() => {
              navigate('/login');
            }}
            style={{
              fontWeight: '600',
              letterSpacing: '3px',
            }}
          >
            시작하기
          </LoginBtn>
        </>
      )}
    </Container>
  );
};

export default RegisterPage;

const TitleArea = styled.div`
  width: 350px;
  padding-left: 20px;
  margin-bottom: 20px;
  font-size: 1.4em;
  font-weight: 600;
`;

const CheckArea = styled.div`
  display: flex;
  height: 120px;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  margin-bottom: 10px;
`;

const CheckInfo = styled.div`
  font-size: 16px;
  color: ${theme.color.mainColor};
  font-weight: bold;
`;

const StepFourInfo = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.3;
`;

const CustomInput = styled(RegistInput)(({ theme, isDarkMode }) => ({
  '& .MuiInputBase-input': {
    color: isDarkMode ? '#fff' : '#000', // 텍스트 색상 변경
  },
}));