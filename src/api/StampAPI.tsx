import axios from 'axios';

// 스탬프 전송하는 API 함수
export const StampAPI = async (missionInfo: object) => {
  try {
    // 절대 경로 대신 상대 경로 사용
    const response = await axios.put(`/api/user/update-mission`, missionInfo);
    return response.data;
  } catch (error) {
    console.error('실패:', error);
    throw error; // 오류 발생 시 예외를 던져서 처리
  }
};
