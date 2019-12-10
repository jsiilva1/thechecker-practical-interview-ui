/**
 * External Dependencies
 */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import '../../../../node_modules//react-toastify/dist/ReactToastify.css';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

/**
 * Internal Dependencies
 */
import { Button } from '../../theme/objects/Button';
import { CardListWrapper, List, ListBody } from './styles';
import { doRequest2 } from '../../utils/requestHandler';
import ProgressBar from '../ProgressBar';
import Icon from '../Icon';
import { getObjectUnique } from '../../utils/helpers';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [listDetail, setListDetail] = useState([]);

  /*
   * Since lists with mailchimp on component mount
  */
  useEffect(() => {
    // Get lists from username
    const fetchMailchimpLists = async () => {
      if (localStorage.getItem('user')) {
        const { username } = JSON.parse(localStorage.getItem('user'));

        const response = await Axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}/provider/mailchimp/lists`,
          params: {
            username,
          },
        });

        const { data } = response.data;

        // Avoid redundancies in mailchimp array lists
        const getUniqueMailchimpLists = getObjectUnique(data, 'id');

        // Iterate lists
        getUniqueMailchimpLists.map((list) => {
          setMailchimpLists([...mailchimpLists, list]);
        });
      }
    };

    fetchMailchimpLists();
  }, []);

  /*
   * Since lists from mailchimp to API
  */  
  useEffect(() => {
    if (mailchimpLists.length > 0) {
      // Get audience from list
      const fetchEmailsAudience = async () => {
        if (localStorage.getItem('user')) {
          if (mailchimpLists[0]) {
            const { username } = JSON.parse(localStorage.getItem('user'));

            const response = await Axios({
              method: 'GET',
              url: `${process.env.REACT_APP_API_URL}/provider/mailchimp/lists/${mailchimpLists[0].id}`,
              params: {
                username,
              },
            });

            const { data } = response.data;

            setEmailsList({ email_address: data.email_address });

            return data;
          }
        }
      };

      /*
       *
       * Synce lists with API into
      */
      const sendListToAPI = async () => {
        mailchimpLists.map(async (mailchimpList) => {
          const { id } = mailchimpList;

          // Execute presave to verify if mailchimp list id exists
          const response = await Axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/provider/mailchimp/lists/presave/${id}`,
          });

          const { data } = response.data;

          // If list not exists
          if (!data) {
            // Get all emails
            const fetchEmailsFromList = await fetchEmailsAudience();
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
                url: `${process.env.REACT_APP_API_URL}/lists`,
                data: body,
              });

              if (createList.data.success) {
                getSincedLists();
                toast.success('Synced lists successfully', { className: 'toaster' });
              }
            } catch (err) {
              toast.error('Error syncing lists', { className: 'toaster' });
            }
          }
        });
      };

      // Sync new lists in api
      sendListToAPI();
      getSincedLists();
    } // end if    
  }, [mailchimpLists]);

  /*
   * Get all lists from API
  */    
  const getSincedLists = async () => {
    const response = await Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/lists`
    });

    if (response.data.success) {
      if (response.data.data) {
        const { data: listData } = response.data;

        // Set lists to new data from db
        // Iterate lists
        listData.map((list) => {
          setLists([...lists, list]);
        });
      }

      const res = response.data.data[0];

      if (res) {
        setAmountEmails(res.emails.length);
      }
    }
  };

  /*
   * Update list status 
  */   
  const updateList = async () => {
    try {
      if (lists[0]) {
        await Axios({
          method: 'PUT',
          url: `http://localhost:5000/api/v1/lists/${lists[0]._id}`
        });
      }
    } catch (err) {
      console.log(err);
    }

    getSincedLists();
  };

  /*
   * To count each verified email on verified emails progress animation
  */   
  useEffect(() => {
    setVerifiedEmailsCount(verifiedEmailsCount + 1);
  }, [verifiedEmails]);

  /*
   * Send email verification to API
  */     
  const handleTheCheckerVerification = () => {
    const { emails } = lists[0];

    const fetchResults = async (email, i) => {
      setIsChecking(true);

      setTimeout(async () => {
        const response = await doRequest2({
          method: 'POST',
          endpoint: 'lists/verify',
          data: { email }
        });

        if (response.data) {
          setVerifiedEmails([...verifiedEmails, response.data.email_address]);
        }

        if (i === amountEmails-1) {
          toast.success('List updated. Refresh to view results', { className: 'toaster' });
        }
      }, 1000 * i);
    };

    emails.map((emailInfo, index) => fetchResults(emailInfo.email_address, index));

    // Update list status
    updateList();
  };

  /*
   * Show status of verification emails
  */    
  const displayStatus = () => {
    if (verifiedEmailsCount === amountEmails) {
      return <p className='displayed-status'>Verification completed</p>;
    }

    if (verifiedEmailsCount <= amountEmails) {
      return <p className='displayed-status'>{verifiedEmailsCount} of {amountEmails} verified<br /></p>;
    }
  };

  /*
   * Show lists 
  */   
  const showLists = () => {
    if (lists.length > 0) {
      return (
        <>
        <List>
          <ListBody>
            {lists[0].verified && (
              <Icon
                title='Verified list'
                name={['fas', 'check-circle']}
                vendor='fa'
                style={{ fontSize: '1rem', marginTop: '5px', float: 'right', color: '#57D695' }}
              />
            )}

            <h1 className='list-title'>{lists[0].name}</h1>
            <h2 className='list-id'>ID: {lists[0]._id}</h2>
            <p className='list-createdat'>Created at {lists[0].createdAt}</p>

            <p className='stats'>
              <span className='stats-number'>{amountEmails}</span> emails in list
              </p>

            {!lists[0].verified && displayStatus()}

            {!lists[0].verified && (
              <Button
                color='light'
                onClick={() => handleTheCheckerVerification()}
                disabled={isChecking ? true : false}
                disabled={lists[0].verified ? true : false}
                title={lists[0].verified ? 'This list has already been verified' : `Execute verification on ${amountEmails} emails in TheChecker Single Verification API`}
              >
                Run verification
                  </Button>
            )}

            {lists[0].verified && (
              <Button
                color='light'
                onClick={() => viewListReport()}
                title={'View checked emails report'}
              >
                View report
                  </Button>
            )}
          </ListBody>

          <div className='progress-bar-wrapper'>
            <ProgressBar percent={(verifiedEmailsCount / amountEmails) * 100} />
          </div>
        </List>
        </>
      );
    }
  };

  /*
   * Get list and emails report
  */     
  const viewListReport = async () => {
    // Open modal
    handleModalOpen();

    const response = await Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/lists/${lists[0].mailchimpListId}`
    });

    if (response.data.success) {
      setListDetail([...listDetail, response.data.data]);
    }
  };

  /*
   * Render and show table body of reports list
  */ 
  const renderTableBody = () => {
    if (listDetail.length > 0) {
      const { emails } = listDetail[0][0];
  
      return emails.map((email) => {
        return (
          <tr>
            <td><p>{email.email_address}</p></td>
            <td><p>{email.status}</p></td>
            <td><p>{email.statusDetail}</p></td>
            <td><p>{email.listId}</p></td>
          </tr>          
        );
      });
    }
  };
 
  /*
   * Handle to open modal
  */  
  const handleModalOpen = () => setModalIsOpen(true);

  /*
   * Handle to close modal
  */   
  const handleModalClose = () => setModalIsOpen(false);

  /*
   * Render full report modal
  */    
  const renderModal = () => {
    let listFullDetail = null;

    if (listDetail[0]) listFullDetail = listDetail[0];

    const actions = [
      { text: 'Close', onClick: handleModalClose },
    ];

    return (
      <ModalTransition>
        {modalIsOpen && (
          <div style={{ fontSize: '0.8rem' }}>
            <Modal
              actions={actions}
              onClose={handleModalClose}
              heading={`Report for ${listFullDetail ? listFullDetail[0].name : 'Unknown'} List`}
              width={'60rem'}
            >

              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th>List ID</th>
                  </tr>
                </thead>

                <tbody>
                  {renderTableBody()}
                </tbody>
              </table>

            </Modal>
          </div>
        )}
      </ModalTransition>
    );
  };

  return (
    <CardListWrapper>
      {showLists()}
      {renderModal()}
    </CardListWrapper>
  );
};

export default CardList;