export interface CheckoutFormProps {
    userId: string;
    aliyahIds: string[];
    onSuccess: () => void;
    totalAmount: number;
}