import React from 'react';

import Logo from './shared/components/Logo';
import { loadFonts, GlobalStyle } from './shared/theme/core';

const App = () => {
  return (
    <div className="App">
      <loadFonts />
      <GlobalStyle />
      <Logo />
      <p>hello world from thechecker practical interview app</p>
    </div>
  );
};

export default App;
