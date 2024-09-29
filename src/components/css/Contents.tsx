import styled from 'styled-components';

const Contents = styled.div<{ isDarkMode: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 700px;
  /* max-height: 730px; */
  max-width: 480px; /* 모바일에서 최대 너비 고정 */
  margin: 0 auto;
  box-sizing: border-box;
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#20232a' : '#ffffff')};
  /* overflow-y: scroll; */
`;

export default Contents;
