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
import { toast, ToastContainer } from 'react-toastify';
import '../../../../node_modules//react-toastify/dist/ReactToastify.css';
toast.configure();

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
  const [isChecking, setIsChecking] = useState(false);
  const [mailchimpLists, setMailchimpLists] = useState([]);
  const [lists, setLists] = useState([]);

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
        setMailchimpLists(mailchimpLists => [...mailchimpLists, data[0] ]);
      }
    };

    fetchLists();
    sinceLists();
  }, []);

  useEffect(() => {
    // Get audience from list
    const fetchEmails = async () => {
      if (localStorage.getItem('user')) {
        if (mailchimpLists[0]) {
          const { username } = JSON.parse(localStorage.getItem('user'));

          const response = await Axios({
            method: 'GET',
            url: `http://localhost:5000/api/v1/provider/mailchimp/lists/${mailchimpLists[0].id}`,
            params: {
              username,
            },
          });
    
          const { data } = response.data;
  
          setEmailsList({ email_address: data.email_address });
          setAmountEmails(data.length);

          return data;
        }
      }
    };   
    
    const sendLists = async () => {
      if (mailchimpLists[0]) {
        // Execute presave to verify if mailchimp list id exists
        const response = await Axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/provider/mailchimp/lists/presave/${mailchimpLists[0].id}`,
        });
  
        const { data } = response.data;
        
        // If list not exists
        if (!data) {
          // Get all emails
          const fetchEmailsFromList = await fetchEmails();
          const emails = [];

          if (fetchEmailsFromList) {
            fetchEmailsFromList.map((email) => emails.push({ email_address: email.email_address }));
          }

          let body = {
            name: mailchimpLists[0].name,
            mailchimpListId: mailchimpLists[0].id,
            emailsInfo: emails,
          };

          try {
            // Create list into database
            const createList = await Axios({
              method: 'POST',
              url: 'http://localhost:5000/api/v1/lists',
              data: body,
            });

            if (createList.data.success) {
              // Set lists to new data from db
              sinceLists();

              toast.success('Synced lists successfully', { className: 'toaster' });
            }
          } catch (err) {
            toast.error('Error syncing lists', { className: 'toaster' });
          }
        } 
      }    
    };

    sendLists();
  }, [mailchimpLists, lists]);

  useEffect(() => {
    setVerifiedEmailsCount(verifiedEmailsCount + 1);
  }, [verifiedEmails]);

  const sinceLists = async () => {
    const response = await Axios({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/lists'
    });
  
    if (response.data.success) {
      // Set lists to new data from db
      setLists(lists => [...lists, response.data.data[0] ]);      
    } 
  };

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
    if (lists[0]) {
      if (lists.length === 1) {
        return (
          <List>
            <ListBody>
              <h1 className='list-title'>{lists[0].name}</h1>
              <h2 className='list-id'>ID: {lists[0]._id}</h2>
              <p className='list-createdat'>Created at {lists[0].createdAt}</p>
  
              <p className='stats' title="View list">
                <span className='stats-number'>{4}</span> emails in list
              </p>
  
              {displayStatus()}
  
              <Button 
                color='light' 
                title={`Execute verification on 4 emails in TheChecker Single Verification API`}
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
    }
  };

  return (
    <CardListWrapper>
      {showLists()}
    </CardListWrapper>
  );
};

export default CardList;