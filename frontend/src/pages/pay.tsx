
import './PaymentPage.css'; // Custom CSS for better styling
import UnpaidAliyot from './UnpaidAliyot';
import { useAuthStore } from '../store/authStore';

// Load Stripe with your publishable key


const PaymentPage = () => {
    const { user } = useAuthStore();
    return(
    <div>
            <UnpaidAliyot userId={user._id} />
        </div>
        )
}
export default PaymentPage