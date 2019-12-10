/**
 * External Dependencies
 */
import React, { useState, useEffect } from 'react';

/**
 * Internal Dependencies
 */
import { Button } from '../../theme/objects/Button';
import { CardListWrapper, List, ListBody } from './styles';
import { doRequest2 } from '../../utils/requestHandler';
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
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Get lists from username
    const fetchLists = async () => {
      if (localStorage.getItem('user')) {
        const { username } = JSON.parse(localStorage.getItem('user'));

        const response = await Axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/provider/mailchimp/lists`,
          params: {
            username,
          },
        });
  
        const { data } = response.data;
        setLists(lists => [...lists, data[0] ]);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    // Get audience from list
    const fetchEmails = async () => {
      if (localStorage.getItem('user')) {
        if (lists[0]) {
          const { username } = JSON.parse(localStorage.getItem('user'));

          const response = await Axios({
            method: 'GET',
            url: `http://localhost:5000/api/v1/provider/mailchimp/lists/${lists[0].id}`,
            params: {
              username,
            },
          });
    
          const { data } = response.data;
  
          setEmailsList(data);
          setAmountEmails(data.length);
        }
      }
    };   
    
    fetchEmails();
  }, [lists]);

  useEffect(() => {
    setVerifiedEmailsCount(verifiedEmailsCount + 1);
  }, [verifiedEmails]);

  const handleTheCheckerVerification = () => {
    const fetchResults = async (email, i) => {
      setIsChecking(true);

      setTimeout(async () => { 
        const response = await doRequest2({
          method: 'POST',
          endpoint: 'lists/verify',
          data: { email }
        });
  
        if (response.data) {         
          setVerifiedEmails(verifiedEmails => [...verifiedEmails, response.data.email_address ]);
        }
      }, 1000 * i);      
    };

    emailsList.map((emailInfo, index) => fetchResults(emailInfo.email_address, index));
  };

  const displayStatus = () => {
    if (verifiedEmailsCount <= amountEmails) {
      return <p className='displayed-status'>{verifiedEmailsCount} of {amountEmails} verified<br /></p>;
    } else if (verifiedEmailsCount === amountEmails) {
      return <p className='displayed-status'>Verification completed</p>;
    }
  };

  const showLists = () => {
    if (lists.length === 1) {
      return (
        <List>
          <ListBody>
            <h1 className='list-title'>{lists[0].name}</h1>
            <h2 className='list-id'>ID: {lists[0].id}</h2>
            <p className='list-createdat'>Created at {lists[0].date_created}</p>

            <p className='stats' title="View list">
              <span className='stats-number'>{lists[0].member_count}</span> emails in list
            </p>

            {displayStatus()}

            <Button 
              color='light' 
              title={`Execute verification on ${lists[0].member_count} emails in TheChecker Single Verification API`}
              onClick={() => handleTheCheckerVerification()}
              disabled={!isChecking ? false : true}
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