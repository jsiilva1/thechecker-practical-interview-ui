import React from 'react';

import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import { loadFonts, GlobalStyle } from './shared/theme/core';

const App = () => {
  return (
    <div className="App">
      <loadFonts />
      <GlobalStyle />
      
      <Header />
      <Footer />
    </div>
  );
};

export default App;
