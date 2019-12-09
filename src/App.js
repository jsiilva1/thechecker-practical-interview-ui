import React from 'react';

import Header from './shared/components/Header';
import { loadFonts, GlobalStyle } from './shared/theme/core';

const App = () => {
  return (
    <div className="App">
      <loadFonts />
      <GlobalStyle />
      <Header />
      <p>hello world from thechecker practical interview app</p>
    </div>
  );
};

export default App;
