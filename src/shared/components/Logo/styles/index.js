import styled from 'styled-components';

import logoSrc from '../../../assets/images/thechecker_logo.svg';

export const LogoContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  float: left;
  justify-content: flex-start;

  & p {
    float: left;
    position: relative;
    left: -36px;
    top: 10px;
    font-weight: 400;
    color: #cdcdcd;
    font-size: 1.2rem;
  }
`;

export const Figure = styled.figure`
  height: 30px;
`;

export const LogoAvatar = styled.img.attrs({
  src: logoSrc,
})`
  height: inherit;
`;