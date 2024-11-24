import React from 'react';
import UserMessagesComponent from '../components/UserMessagesComponent';

const Private: React.FC = () => {
    console.log('Private');
    return (
        <div>
            <UserMessagesComponent />
        </div>
    );
};

export default Private;
