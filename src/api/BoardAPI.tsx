import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

// Board 정보 불러오는 API
export const GetBoardAPI = async () => {
  try {
    const response = await axios(`${apiUrl}/api/cheerup`);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 불러오기 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};

export const PostBoardAPI = async (textInfo: any) => {
  try {
    const response = await axios.post(`${apiUrl}/api/cheerup`, textInfo);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 전송 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};

export const DeleteBoardAPI = async (e: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/cheerup/${e}`);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 삭제 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};
