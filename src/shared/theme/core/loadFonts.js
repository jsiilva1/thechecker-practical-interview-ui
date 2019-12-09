import { css } from 'styled-components';

import LatoLight from '../../assets/fonts/Lato-Light.ttf';
import LatoRegular from '../../assets/fonts/Lato-Regular.ttf';
import LatoBlack from '../../assets/fonts/Lato-Black.ttf';

export const loadFonts = css`
  @font-face {
    font-family: 'Lato', sans-serif;
    src: url(${LatoLight}) format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato', sans-serif;
    src: url(${LatoRegular}) format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato', sans-serif;
    src: url(${LatoBlack}) format('ttf');
    font-weight: 700;
    font-style: normal;
  }
`;