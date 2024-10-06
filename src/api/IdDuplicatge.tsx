import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

// 회원가입 아이디 붕복 체크 API
export const IdDuplicateAPI = async (userInfo: { id: string }) => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/check-id`, {
      params: { id: userInfo.id }, // 쿼리 스트링으로 아이디 전달
    });
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('아이디 중복입니다.', error);
    throw error; // 오류 발생 시 예외 던짐
  }
};
