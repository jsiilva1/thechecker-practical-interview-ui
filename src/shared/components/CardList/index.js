import React from 'react';

import { Button } from '../../theme/objects/Button';
import { CardListWrapper, List } from './styles';

const CardList = () => {
  return (
    <CardListWrapper>
      <List>
        <h1 className='list-title'>List title</h1>
        <h2 className='list-id'>ID: 5deb0de401e34328d288d398</h2>
        <p className='list-createdat'>Created at December 6, 2019 11:26 PM</p>

        <p className='stats' title="View list">
          <span className='stats-number'>4</span> emails in list
        </p>

        <Button 
          color='light' 
          title="Execute verification on 4 emails in TheChecker Single Verification API"
          >
          Execute verification
        </Button>
      </List>
    </CardListWrapper>
  );
};

export default CardList;