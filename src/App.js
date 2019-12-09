import React from 'react';

import { loadFonts, GlobalStyle } from './shared/theme/core';

function App() {
  return (
    <div className="App">
      <loadFonts />
      <GlobalStyle />
      <p>hello world from thechecker practical interview app</p>
    </div>
  );
}

export default App;
