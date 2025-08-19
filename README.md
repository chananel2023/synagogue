# 🏛️ בית הכנסת בית ישראל - Management System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**A comprehensive digital management system for synagogue communities**

[🌐 Live Demo](#) | [📋 Features](#features) | [🚀 Quick Start](#quick-start) | [📖 Documentation](#api-documentation)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

The **Beth Israel Synagogue Management System** is a modern, full-stack web application designed to digitize and streamline synagogue operations. Built with community needs in mind, it provides comprehensive tools for managing religious services, community members, and administrative tasks.

### 🌟 Why This Project?

Modern religious communities need digital solutions that respect tradition while embracing technology. This system bridges that gap by providing:

- **Community-First Design**: Built specifically for synagogue workflow
- **Hebrew/English Support**: Bilingual interface for diverse communities  
- **Secure & Reliable**: Enterprise-grade security for sensitive community data
- **Mobile-Responsive**: Access from any device, anywhere

---

## ✨ Features

### 🕍 Core Synagogue Management

| Feature | Description | Status |
|---------|-------------|---------|
| **Torah Aliyah System** | Book, track, and manage Torah reading assignments | ✅ Complete |
| **Prayer Times** | Dynamic prayer schedule with real-time updates | ✅ Complete |
| **Seat Management** | Interactive synagogue seating chart | ✅ Complete |
| **Learning Sessions** | Shiurim and class scheduling system | ✅ Complete |

### 💰 Financial Management

| Feature | Description | Status |
|---------|-------------|---------|
| **Payment Processing** | Stripe integration for donations and fees | ✅ Complete |
| **Aliyah Payments** | Track and process Torah reading fees | ✅ Complete |
| **Donation System** | Multiple payment methods (PayPal, Bit) | ✅ Complete |
| **Financial Reporting** | Admin dashboard for payment tracking | ✅ Complete |

### 👥 Community Features

| Feature | Description | Status |
|---------|-------------|---------|
| **User Management** | Multi-role authentication system | ✅ Complete |
| **Community Messages** | Announcements and notifications | ✅ Complete |
| **Admin Dashboard** | Comprehensive management interface | ✅ Complete |
| **Responsive Design** | Mobile-first approach | ✅ Complete |

### 🔧 Technical Features

| Feature | Description | Status |
|---------|-------------|---------|
| **JWT Authentication** | Secure user sessions | ✅ Complete |
| **Email Integration** | Automated notifications via Mailtrap | ✅ Complete |
| **Data Validation** | Comprehensive input sanitization | ✅ Complete |
| **Error Handling** | Robust error management system | ✅ Complete |

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Payment**: Stripe API
- **Email**: Mailtrap
- **Testing**: Jest
- **Language**: TypeScript

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Material-UI Icons, Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios

### DevOps & Tools
- **Containerization**: Docker
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Environment**: dotenv

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/baruchyankovich/beit-israel-synagogue.git
cd beit-israel-synagogue
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

Create `.env` files in both backend and frontend directories:

**Backend `.env`:**
```env
PORT=5007
MONGO_URI=mongodb://localhost:27017/beit-israel
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
MAILTRAP_TOKEN=your_mailtrap_token
MAILTRAP_ENDPOINT=your_mailtrap_endpoint
CLIENT_URL=http://localhost:3000
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5007
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or start your local MongoDB service
mongod
```

### 5. Run the Application

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

🎉 **Your application is now running!**
- Frontend: http://localhost:3000
- Backend: http://localhost:5007

---

## 📁 Project Structure

```
beit-israel-synagogue/
├── backend/                 # Node.js backend
│   ├── controllers/         # Route handlers
│   │   ├── auth.controller.js
│   │   ├── aliyaht.controller.js
│   │   ├── message.controller.js
│   │   └── ...
│   ├── models/              # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── TorahAliyah.model.js
│   │   └── ...
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication & validation
│   ├── config/              # Database & service configs
│   ├── utils/               # Helper functions
│   ├── mailtra/             # Email templates & config
│   └── tests/               # Unit tests
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar2.tsx
│   │   │   ├── TfilotList.tsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── homePage.tsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ...
│   │   ├── pagesAdmin/      # Admin interface
│   │   ├── store/           # State management
│   │   ├── models/          # TypeScript interfaces
│   │   ├── services/        # API communication
│   │   └── styles/          # CSS & Tailwind
│   └── public/              # Static assets
│
└── docs/                    # Documentation
    ├── api.md
    └── deployment.md
```

---

## 🔐 Authentication System

The application uses JWT-based authentication with multiple user roles:

### User Roles
- **Admin**: Full system access and management
- **User**: Access to personal features and community content
- **Guest**: Limited access to public content

### Protected Routes
```typescript
// Example protected route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/verify-email` | Email verification |
| GET | `/api/auth/check-auth` | Verify authentication status |

### Torah Aliyah Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/aliyah/addAliyahToUser` | Add aliyah to user |
| GET | `/api/aliyah/getUnpaidAliyot` | Get unpaid aliyot |
| POST | `/api/aliyah/payAliyot` | Process aliyah payment |
| DELETE | `/api/aliyah/delete` | Delete aliyah |

### Example API Usage

```javascript
// Login user
const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  return data;
};

// Add aliyah
const addAliyah = async (userId, aliyahDetails) => {
  const response = await fetch('/api/aliyah/addAliyahToUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, aliyahDetails }),
  });
  
  return response.json();
};
```

---

## 💳 Payment Integration

The system integrates with Stripe for secure payment processing:

### Supported Payment Methods
- **Credit/Debit Cards**: Via Stripe
- **PayPal**: External integration
- **Bit (Israeli)**: External integration

### Payment Flow
1. User selects unpaid aliyot
2. Stripe payment form renders
3. Payment processed securely
4. Aliyot marked as paid
5. Confirmation email sent

```typescript
// Example payment processing
const processPayment = async (paymentMethodId, amount) => {
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: paymentMethodId
    }
  );
  
  if (error) {
    console.error('Payment failed:', error);
  } else {
    console.log('Payment succeeded:', paymentIntent);
  }
};
```

---

## 🧪 Testing

Run the test suite:

```bash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test
```

### Test Coverage
- **Unit Tests**: Individual component/function testing
- **Integration Tests**: API endpoint testing
- **Authentication Tests**: JWT validation testing

---

## 🐳 Docker Support

Run the entire application with Docker:

```bash
# Start MongoDB
docker-compose up -d

# Build and run the application
docker build -t beit-israel-backend ./backend
docker build -t beit-israel-frontend ./frontend

docker run -p 5007:5007 beit-israel-backend
docker run -p 3000:3000 beit-israel-frontend
```

---

## 🌐 Deployment

### Environment-Specific Configurations

**Development:**
```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/beit-israel-dev
```

**Production:**
```env
NODE_ENV=production
MONGO_URI=mongodb://your-production-uri
STRIPE_SECRET_KEY=sk_live_your_live_key
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, DigitalOcean
- **Database**: MongoDB Atlas

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Process
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features

---

## 📞 Support & Contact

- **Developer**: Baruch Yankovich
- **Email**: baruchyankovitz@gmail.com
- **LinkedIn**: [linkedin.com/in/baruch-yankuvitz](https://www.linkedin.com/in/baruch-yankuvitz/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Community Members**: For their feedback and testing
- **Open Source Libraries**: All the amazing packages that made this possible
- **Synagogue Leadership**: For trusting in this digital transformation

---

<div align="center">

**Built with ❤️ for the בית הכנסת בית ישראל community**

*"Technology serving tradition, innovation respecting heritage"*

[⬆️ Back to Top](#-בית-הכנסת-בית-ישראל---management-system)

</div>
