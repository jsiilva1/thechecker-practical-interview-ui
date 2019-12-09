import React from 'react';

import { CardListWrapper, List } from './styles';

const CardList = () => {
  return (
    <CardListWrapper>
      <List>
        Lista 1
      </List>

      <List>
        Lista 2 
      </List>

      <List>
        Lista 3
      </List>
    </CardListWrapper>
  );
};

export default CardList;