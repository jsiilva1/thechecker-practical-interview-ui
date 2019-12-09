/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { LogoContainer, Figure, LogoAvatar } from './styles';

/**
 * Component Logo
 *
 * Render Logo of TheChecker Co
 * @return {*}
 */
const Logo = () => (
  <LogoContainer>
    <Figure>
      <LogoAvatar title="TheChecker Co" alt="TheChecker Co" />
    </Figure>

    <p>Practical Interview</p>    
  </LogoContainer>
);

export default Logo;