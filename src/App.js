// @flow
import React, { useState, useEffect } from 'react';

import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import BarProgressIndicator from './shared/components/BarProgressIndicator';
import PageContainer from './shared/components/PageContainer';

import { loadFonts, GlobalStyle } from './shared/theme/core';

type State = {|
  isLoading: boolean,
|};

const App = () => {
  const [isLoading, setIsLoading] = useState<State>(false);

  const pageIsLoading = () => window.addEventListener('load', () => setIsLoading(true));

  useEffect(() => pageIsLoading());

  return (
    <>
      <BarProgressIndicator loading={isLoading} />

      <loadFonts />
      <GlobalStyle />
      
      <Header />
      
      <PageContainer>
        Container page
      </PageContainer>

      <Footer />    
    </>
  );
};

export default App;
