import React from 'react';

import TopBarProgressIndicator from 'react-topbar-progress-indicator';

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