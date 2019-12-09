// @flow
import React, { useState, useEffect } from 'react';

import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import BarProgressIndicator from './shared/components/BarProgressIndicator';
import PageContainer from './shared/components/PageContainer';
import CardList from './shared/components/CardList';
import MailchimpCallToActionButton from './shared/components/MailchimpCallToActionButton';

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
        <CardList />
      </PageContainer>

      <MailchimpCallToActionButton />

      <Footer />    
    </>
  );
};

export default App;
