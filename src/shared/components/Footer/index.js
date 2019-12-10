/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { FooterBox } from './styles';

/**
 * Component Footer
 * Render default footer of pages 
 *
 * @return {Object} component.
 */
const Footer = () => (
  <FooterBox>
    <p>
      By <b><a href="mailto:jsiilva@outlook.com.br" title="Shall we have a cup of coffee?">Ivanicio Junior</a></b>
    </p>
  </FooterBox>
);

export default Footer;