import styled from 'styled-components';
import InfoInput from '../components/form/InfoInput';
import LoginBtn from '../components/form/LoginBtn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from 'api/LoginAPI';
import Container from '../components/css/Container';
import theme from 'styles/theme';

const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const [inputInfo, setInputInfo] = useState({
    id: '',
    pwd: '',
  });

  const DarkMode = localStorage.getItem('darkMode') === 'true';

  const onChangeInfo = (e: any) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value });
  };

  const onClickLogin = async () => {
    if (!inputInfo.id || !inputInfo.pwd) {
      alert('아이디, 비밀번호를 모두 입력하세요.');
      return;
    }
    try {
      const data = await loginAPI(inputInfo); // 로그인 API 호출
      sessionStorage.setItem('token', data.token);
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container isDarkMode={DarkMode}>
      <TitleArea>
        <ColorSpan
          style={{
            alignItems: 'center',
            fontSize: '0.6em',
            backgroundColor: `${theme.color.mainColor}`,
            color: '#fff',
            padding: '1% 3%',
            borderRadius: '30px',
            width: '10%',
            textAlign: 'center',
            margin: '10px auto',
          }}
        >
          TMI
        </ColorSpan>
        <ColorSpan>
          <span style={{ color: `${theme.color.mainColor}` }}>무너</span>의
          고향은 용궁입니다.
        </ColorSpan>
      </TitleArea>
      <InfoInput2
        placeholder="아이디"
        name="id"
        onChange={onChangeInfo}
        style={{ color: `${DarkMode ? '#ffffff' : '#000000'}` }}
      />
      <InfoInput2
        placeholder="비밀번호"
        type="password"
        name="pwd"
        onChange={onChangeInfo}
        style={{ color: `${DarkMode ? '#ffffff' : '#000000'}` }}
      />
      <LoginBtn
        variant="contained"
        onClick={onClickLogin}
        style={{
          fontSize: '1.3em',
          fontWeight: '600',
          letterSpacing: 'px',
          color: '#fff',
        }}
      >
        로그인
      </LoginBtn>
      <FootArea>
        <span
          style={{ margin: '0 40px 0 92px', cursor: 'pointer' }}
          onClick={() => {
            alert(
              '단순 오류에 의하여 해결중에 있습니다. 불편을 끼쳐 죄송합니다.'
            );
          }}
        >
          ID/PW 찾기
        </span>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/register');
          }}
        >
          회원가입
        </span>
      </FootArea>
    </Container>
  );
};

export default LoginPage;
const InfoInput2 = styled(InfoInput)`
  ::placeholder {
    /* color: #fff; */
    font-size: 12px;
  }
`;
const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding-left: 20px;
  margin-bottom: 20px;
  font-size: 1.4em;
  font-weight: 900;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const ColorSpan = styled.span`
  // Login 페이지 글자 색 바꾸는 용도
  font-size: 1.1em;
  font-weight: 700;
`;

const FootArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;
  width: 350px;
  font-weight: 600;
  color: #6b6b6b;
  margin-top: 11px;
  font-size: 13px;
`;
