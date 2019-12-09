/**
 * External Dependencies
 */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Internal Dependencies
 */
import Icon from '../Icon';
import { Button } from '../../theme/objects/Button';
import { CallToActionWrapper } from './styles';
import { doRequest } from '../../utils/requestHandler';

/**
 * Component MailchimpCallToActionButton
 *
 * Render the call to action buttton to get lists of mailchimp
 * @return {*}
 */
const MailchimpCallToActionButton = () => {
  const handleActionMailchimpIntegration = async () => {
    const mailchimpUri = 'https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=427517757036';
    
    window.open(mailchimpUri, '_blank');
  };

  useEffect(() => {
    toast.info('The integration with mailchimp was successful!');

    const { search } = window.location;
    const params = new URLSearchParams(search);
    
    const code = params.get('code');
    
    if (code) {
      doRequest({
        method: 'POST',
        endpoint: 'mailchimp/authorize',
        data: {
          code,
        },
      })
        .then((res) => {
          const { data } = res;

          localStorage.setItem('access_token', data.access_token);
        
        });
    }
  });

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

export default MailchimpCallToActionButton;