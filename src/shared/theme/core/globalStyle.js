import { createGlobalStyle, css } from 'styled-components';
import { Reset } from 'styled-reset';
import { LoadFonts } from '../core';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F0F0F0; /*#F0F4F3*/
    font-size: calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)));
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
  }

  .toaster {
    font-size: 1rem;
    font-weight: 500;
  }

  th, td {
    border-right: 1px solid #F0F0F0;
    padding: 10px;

    &:last-child { border-right: none; }
  }

  th { text-align: left; }

  table p { font-size: 1.1rem; color: #7f8c8d; margin: 0; }

  table {
    padding: 10px;
    font-size: 1.1rem;
    width: 100%;
  }
  
  a { text-decoration: none; color: inherit; }
  ${Reset}
  ${LoadFonts}
`;