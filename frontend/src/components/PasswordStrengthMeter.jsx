import PropTypes from 'prop-types';
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  if (password === undefined || password === null) {
    return null; // טיפול במקרה שאין סיסמה
  }

  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className='mt-2 space-y-1'>
      {criteria.map((item) => (
        <div key={item.label} className='flex items-center text-xs'>
          {item.met ? (
            <Check className='size-4 text-green-500 mr-2' />
          ) : (
            <X className='size-4 text-gray-500 mr-2' />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// הגדרת PropTypes עבור PasswordCriteria
PasswordCriteria.propTypes = {
  password: PropTypes.string, // מאפשר גם חוסר ערך לסיסמה
};

export default PasswordCriteria;
