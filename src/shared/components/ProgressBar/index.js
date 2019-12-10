/**
 * External Dependencies
 */
import React from 'react';

import { ProgressWrapper } from './styles';

/**
 * Component ProgressBar
 *
 * Render the call to action buttton to get lists of mailchimp
 * @return {*}
 */
const ProgressBar = (props) => {
  return (
    <ProgressWrapper now={props.percent} />
  );
};

export default ProgressBar;