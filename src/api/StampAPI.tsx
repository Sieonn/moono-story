import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// 스탬프 전송하는 API 함수
export const StampAPI = async (missionInfo: object) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/user/update-mission`,
      missionInfo
    );
    return response.data;
  } catch (error) {
    console.error('실패:', error);
    throw error; // 오류 발생 시 예외를 던져서 처리
  }
};
