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
import Axios from 'axios';

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
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      if (localStorage.getItem('user')) {
        const { username } = JSON.parse(localStorage.getItem('user'));

        const response = await Axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/lists`,
          params: {
            username,
          },
        });
  
        const { data } = response.data;
        setLists(lists => [...lists, data ]);
      }
    };

    fetchLists();
  }, []);

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
    const fetchResults = async (email, i) => {
      setTimeout(async () => { 
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

    emailsList.map((emailInfo, index) => fetchResults(emailInfo.email, index));
  };

  const displayStatus = () => {
    if (verifiedEmailsCount === amountEmails) {
      return <p className='displayed-status'>Verification completed</p>;
    } 

    if (verifiedEmailsCount <= amountEmails) {
      return <p className='displayed-status'>{verifiedEmailsCount} of {amountEmails} verified<br /></p>;
    }
  };

  const showLists = () => {
    if (lists.length === 1) {
      const currentList = lists[0];

      return (
        <List>
          <ListBody>
            <h1 className='list-title'>{currentList[0].name}</h1>
            <h2 className='list-id'>ID: {currentList[0].id}</h2>
            <p className='list-createdat'>Created at {currentList[0].date_created}</p>

            <p className='stats' title="View list">
              <span className='stats-number'>{currentList[0].member_count}</span> emails in list
            </p>

            {displayStatus()}

            <Button 
              color='light' 
              title={`Execute verification on ${amountEmails} emails in TheChecker Single Verification API`}
              onClick={() => handleTheCheckerVerification()}
              >
              Execute verification
            </Button>
          </ListBody>

          <div className='progress-bar-wrapper'>
            <ProgressBar percent={(verifiedEmailsCount / amountEmails) * 100} />
          </div>
        </List>
      );
    }
  };

  return (
    <CardListWrapper>
      {showLists()}
    </CardListWrapper>
  );
};

export default CardList;