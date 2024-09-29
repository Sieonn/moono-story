// GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --vh: 100%;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard.woff2') format('woff2-variations');
    font-weight: 400 600 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Cafe24Ssurround';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-face {
    font-family: 'RixInooAriDuriR';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/RixInooAriDuriR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'establishRetrosansOTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/establishRetrosansOTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 500; /* 기본 폰트 굵기 */
    font-size: 14px;
    background-color: #f0f0f0;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
  }

  * {
  font-family: 'Pretendard';
  }

  *:focus {
    outline: none;
  }

  button {
    border: none;
    cursor: pointer;
    &:active {
      text-decoration: none;
    }
  }


`;

export default GlobalStyle;
