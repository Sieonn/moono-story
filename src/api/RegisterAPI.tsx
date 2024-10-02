import axios from 'axios';

// 회원가입 API 함수
export const RegisterAPI = async (userInfo: object) => {
  try {
    // 상대 경로를 사용하여 백엔드에 요청
    const response = await axios.post(`/api/user/register`, userInfo);
    return response.data; // 로그인 성공 시 데이터 반환
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error; // 오류 발생 시 예외를 던져서 처리
  }
};
