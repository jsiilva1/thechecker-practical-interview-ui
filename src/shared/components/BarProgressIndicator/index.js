/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import TopBarProgressIndicator from 'react-topbar-progress-indicator';

/**
 * BarProgressIndicator Component
 * Render a top progress bar on load page
 *
 * @param {Object} props component props.
 * @return {Object} component.
 */
const BarProgressIndicator = (props) => {
  TopBarProgressIndicator.config({
    barColors: {
      "0": "#36D7B7",
    },
    shadowBlur: 0,
    barThickness: 2
  });
  
  return (
    <>
      {!props.loading && (
        <TopBarProgressIndicator />
      )}
    </>
  )
}

export default BarProgressIndicator;