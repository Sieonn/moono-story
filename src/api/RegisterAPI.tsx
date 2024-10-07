import axios from 'axios';
// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = process.env.REACT_APP_API_URL || 'https://moonostory.store'; // 기본값 추가

// 로그인 API 함수
export const RegisterAPI = async (userInfo: object) => {
  console.log(apiUrl);
  console.log(userInfo);

  try {
    console.log(apiUrl);

    // const response = await axios.post(`${apiUrl}/api/user/register`, userInfo, {
    const response = await axios.post(`${apiUrl}/api/user/register`, userInfo, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 전송
      },
    });

    return response.data; // 로그인 성공 시 데이터 반환
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error; // 오류 발생 시 예외를 던져서 처리
  }
};
