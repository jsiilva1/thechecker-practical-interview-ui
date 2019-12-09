/**
 * External Dependencies
 */
import React, { useState, useEffect } from 'react';

/**
 * Internal Dependencies
 */
import { Button } from '../../theme/objects/Button';
import { CardListWrapper, List, ListBody } from './styles';
import { doRequest } from '../../utils/requestHandler';
import ProgressBar from '../ProgressBar';

/**
 * Component CardList
 * Render the cards of lists
 *
 * @return {Object} component.
 */
const CardList = () => {
  const [amountEmails, setAmountEmails] = useState(0);
  const [verifiedEmailsCount, setVerifiedEmailsCount] = useState(-1);
  const [emailsList, setEmailsList] = useState([]);
  const [verifiedEmails, setVerifiedEmails] = useState([]);

  useEffect(() => {
    const mockEmails = [
      { email: 'jsiilva@outlook.com.br', isVerified: false },
      { email: 'asd1as5d@outlook.com', isVerified: false },
      { email: 'lara.lira@outlook.com', isVerified: false },
      { email: 'mr.robot@gmail.com', isVerified: false },
    ];

    setEmailsList(mockEmails);
    setAmountEmails(mockEmails.length);
  }, []);

  useEffect(() => {
    setVerifiedEmailsCount(verifiedEmailsCount + 1);
  }, [verifiedEmails]);

  const handleTheCheckerVerification = () => {
    let i = 0;

    const fetch = async (email, i) => {
      setTimeout(async function() { 
        const response = await doRequest({
          method: 'POST',
          endpoint: 'lists/verify',
          data: { email }
        });
  
        if (response.data) {         
          setVerifiedEmails(verifiedEmails => [...verifiedEmails, response.data.email ]);
        }
      }, 1000 * i);      
    };

    for (let i = 0; i < emailsList.length; i++) { 
      fetch(emailsList[i].email, i);
    } 
  };

  return (
    <CardListWrapper>
      <List>
        <ListBody>
          <h1 className='list-title'>List title</h1>
          <h2 className='list-id'>ID: 5deb0de401e34328d288d398</h2>
          <p className='list-createdat'>Created at December 6, 2019 11:26 PM</p>

          <p className='stats' title="View list">
            <span className='stats-number'>4</span> emails in list
          </p>

          {verifiedEmailsCount} de {amountEmails} verified<br />

          <Button 
            color='light' 
            title="Execute verification on 4 emails in TheChecker Single Verification API"
            onClick={() => handleTheCheckerVerification()}
            >
            Execute verification
          </Button>
        </ListBody>

        <div className='progress-bar-wrapper'>
            <ProgressBar percent={(verifiedEmailsCount / amountEmails) * 100} />
          </div>
      </List>
    </CardListWrapper>
  );
};

export default CardList;