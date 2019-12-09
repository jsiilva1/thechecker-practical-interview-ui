/**
 * External Dependencies
 */
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

/**
 * Internal Dependencies
 */
import Icon from '../Icon';
import { Button } from '../../theme/objects/Button';
import { CallToActionWrapper } from './styles';
import { mailchimpLogin } from '../../../store/ducks/auth';

/**
 * Component MailchimpCallToActionButton
 *
 * Render the call to action buttton to get lists of mailchimp
 * @return {*}
 */
const MailchimpCallToActionButton = ({ mailchimpLogin }) => {
  const handleActionMailchimpIntegration = async () => {
    const mailchimpUri = 'https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=427517757036';
    
    window.open(mailchimpUri, '_blank');
  };

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    
    const code = params.get('code');
    
    if (code) {
      const login = mailchimpLogin({ code });
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

export default connect(null, { mailchimpLogin })(MailchimpCallToActionButton);