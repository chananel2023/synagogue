import React from 'react';
import NavbarAdmin from '../components/navBarAdmin'
import MessagesComponent from '../components/MessagesComponent';
const MessageAdmin: React.FC = () => {
    console.log('message');
    return (
        <div>
            <NavbarAdmin />
            <MessagesComponent />

        </div>
    );
};

export default MessageAdmin;
