import React, { useState } from 'react';

interface SignupFormProps {
    onSubmit: (formData: SignupFormData) => void;
}

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const SignupForm = () => {



    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thanks!');
        // onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">שם</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">דוא"ל</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">סיסמה</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button onChange={handleSubmit}
                type="submit">הרשם</button>
        </form>
    );
};

export default SignupForm;
