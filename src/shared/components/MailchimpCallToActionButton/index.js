/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import Icon from '../Icon';
import { Button } from '../../theme/objects/Button';
import { CallToActionWrapper } from './styles';

/**
 * Component MailchimpCallToActionButton
 *
 * Render the call to action buttton to get lists of mailchimp
 * @return {*}
 */
const MailchimpCallToActionButton = () => {
  return (
    <CallToActionWrapper>
      <Button color={'secondary'} title='Select integration with Mailchimp'>
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