import styled from 'styled-components';

const Container = styled.div<{ isDarkMode: any }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  min-width: 300px;
  max-width: 480px; // 모바일에서 최대 너비 고정
  margin: 0 auto;
  box-sizing: border-box;
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#20232a' : '#ffffff')};
  // 스크롤바가 자동으로 표시되도록 변경
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }
`;

export default Container;
