/**
 * External Dependencies
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import Icon from '../Icon';
import { Button } from '../../theme/objects/Button';
import { CallToActionWrapper } from './styles';
import { mailchimpLogin } from '../../../store/ducks/auth';
import Axios from 'axios';

/**
 * Component MailchimpCallToActionButton
 *
 * Render the call to action buttton to get lists of mailchimp
 * @return {*}
 */
const MailchimpCallToActionButton = ({ mailchimpLogin }) => {
  const [code, setCode] = useState('');

  const handleActionMailchimpIntegration = async () => {
    const mailchimpUri = 'https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=427517757036';
    
    window.open(mailchimpUri, '_blank');
  };

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const getCode = params.get('code');

    setCode(getCode);
    
    if (code) {
      // Sig in in mailchimp and generate access token
      mailchimpLogin({ code });
      
      if (localStorage.getItem('access_token')) {
        const access_token = localStorage.getItem('access_token');

        (async () => {
          // Get metadata user
          const response = 
            await Axios({
              method: 'POST',
              url: 'http://localhost:5000/api/v1/provider/mailchimp/user',
              data: { access_token }
            });
            
            const { login } = response.data.data;
            const { login_email, login_name } = login;
  
            // Set user on local storage
            localStorage.setItem('user', JSON.stringify({ email: login_email, username: login_name }));
        })();
      }
    }
  }, [code]);

  return (
    <CallToActionWrapper>
      <Button 
        color={'secondary'} title='Select integration with Mailchimp'
        onClick={() => handleActionMailchimpIntegration()}
        >
        <Icon 
          name={['fab', 'mailchimp']} 
          vendor='fa'
          style={{ fontSize: '1.3rem', marginRight: '6px', float: 'left' }}
        />  
        <p>Mailchimp Integration</p>
      </Button>      
    </CallToActionWrapper>
  );
};

export default connect(null, { mailchimpLogin })(MailchimpCallToActionButton);