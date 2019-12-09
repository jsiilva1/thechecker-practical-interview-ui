import styled from 'styled-components';

import logoSrc from '../../../assets/images/thechecker_logo.svg';

import { device } from '../../../theme/settings/screens';

export const LogoContainer = styled.div`
  width: 100vh;
  display: flex;
  flex-flow: row wrap;
  margin-left: 54%;
  transform: translate(-65%,0);
  max-width: 350px;

  & p {
    margin: 4px;
    font-weight: 400;
    color: #cdcdcd;
    font-size: 1.2rem;
  }

  @media ${device.tablet} {
    p {
      margin-top: 8px;
      font-size: 0.99rem;
    }
  }

  @media ${device.mobile} {
    width: 100vh;
    margin: 15% 86%;
  }
`;

export const Figure = styled.figure`
  height: 30px;
  margin: 0;
`;

export const LogoAvatar = styled.img.attrs({
  src: logoSrc,
})`
  height: inherit;
`;