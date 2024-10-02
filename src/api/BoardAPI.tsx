import axios from 'axios';

// Board 정보 불러오는 API
export const GetBoardAPI = async () => {
  try {
    // 절대 경로 대신 상대 경로 사용
    const response = await axios(`/api/cheerup`);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 불러오기 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};

export const PostBoardAPI = async (textInfo: any) => {
  try {
    // 절대 경로 대신 상대 경로 사용
    const response = await axios.post(`/api/cheerup`, textInfo);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 전송 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};

export const DeleteBoardAPI = async (e: any) => {
  try {
    // 절대 경로 대신 상대 경로 사용
    const response = await axios.delete(`/api/cheerup/${e}`);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 삭제 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};
