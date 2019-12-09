import React from 'react';

import Icon from '../Icon';
import { Button } from '../../theme/objects/Button';

const MailchimpCallToActionButton = () => {
  return (
    <Button color={'secondary'}>
      <Icon 
        name={['fab', 'mailchimp']}
        vendor='fa'
        style={{ fontSize: '1.3rem', marginRight: '6px', float: 'left' }}
      />  
      <p>Mailchimp</p>
    </Button>
  );
};

export default MailchimpCallToActionButton;