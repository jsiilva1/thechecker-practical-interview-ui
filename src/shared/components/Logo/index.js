import React from 'react';

import { LogoContainer, Figure, LogoAvatar } from './styles';

const Logo = () => (
  <LogoContainer>
    <Figure>
      <LogoAvatar title="TheChecker Co" alt="TheChecker Co" />
    </Figure>

    <p>Practical Interview</p>    
  </LogoContainer>
);

export default Logo;