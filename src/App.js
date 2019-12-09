import React, { useState, useEffect } from 'react';

import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import BarProgressIndicator from './shared/components/BarProgressIndicator';
import { loadFonts, GlobalStyle } from './shared/theme/core';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const pageIsLoading = () => {
    window.addEventListener('load', () => {
      setIsLoading(true);
    });
  }

  useEffect(() => pageIsLoading());

  return (
    <>
      <BarProgressIndicator loading={isLoading} />

      <loadFonts />
      <GlobalStyle />
      
      <Header />
      <Footer />    
    </>
  );
};

export default App;
