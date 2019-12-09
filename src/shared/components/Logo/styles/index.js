import styled from 'styled-components';

import logoSrc from '../../../assets/images/thechecker_logo.svg';

export const LogoContainer = styled.div`
  display: flex;
  flex-flow: row nowwrap;

  & p {
    float: left;
    position: relative;
    left: 25px;
    top: 7px;
    font-weight: 400;
    color: #cdcdcd;
    font-size: 1.2rem;
  }
`;

export const Figure = styled.figure`
  width: 112px;
  height: 23px;
`;

export const LogoAvatar = styled.img.attrs({
  src: logoSrc,
})`
  height: inherit;
`;