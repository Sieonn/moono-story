import axios from 'axios';

// 유저 정보 불러오는 API 함수
export const UserInfoAPI = async (id: any) => {
  try {
    // 절대 경로 대신 상대 경로 사용
    const response = await axios.get(`/api/user/${id}`);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 불러오기 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};
