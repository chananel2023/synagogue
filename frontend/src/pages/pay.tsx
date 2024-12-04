import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentPage.css'; // Custom CSS for better styling
import UnpaidAliyot from './UnpaidAliyot';
import { useAuthStore } from '../store/authStore';

// Load Stripe with your publishable key


const PaymentPage = () => {
    const { user, isAuthenticated } = useAuthStore();
    return(
    <div>
            <h1>Your Aliyot</h1>
            {/* אתה שולח את ה-userId כמו שמצופה */}
            <UnpaidAliyot userId={user._id} />
        </div>
        )
}
export default PaymentPage