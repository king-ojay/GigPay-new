# GigPay 🚀

**A Local Marketplace for Sustainable Job Creation**

GigPay is a web application that connects unskilled gig workers to clients in Rwanda, focusing on reducing youth unemployment through technology-enabled job matching for informal and short-term work opportunities.

## 🎯 Mission

To contribute to economic inclusion and development by providing access to short-term work opportunities through technology, particularly addressing the rising unemployment rates among youth in Africa.

## 🌍 Problem Statement

**WHO:** Youth and informal/unskilled workers in Rwanda  
**WHAT:** Struggle to find consistent income-generating opportunities due to lack of job-matching platforms for small gigs  
**WHERE:** Rwanda, starting with Kigali and expanding to surrounding provinces  
**WHY:** Traditional job boards focus mainly on formal employment, leaving informal gig seekers and employers without a platform for "gig hunting"

## 🌐 Live Demo

**Try GigPay:** [https://gigpay-new.onrender.com](https://gigpay-new.onrender.com)

*Note: First load may take a few moments as Render spins up the free tier instance.*

## ✨ Features
### Core Functionality
- **User Registration & Profiles** - Email-based registration with customizable profiles including bio, skills, and location
- **Secure Messaging** - In-app communication between clients and workers
- **Booking System** - Confirmation and scheduling of performance-based services
- **Payment Integration** - Mobile money integration (MTN MoMo) with escrow system
- **Rating & Reviews** - Trust-building through mutual feedback system
- **Financial Dashboard** - Detailed financial analytics for users

### Future Enhancements
- Multi-language support (Kinyarwanda, French, English)
- Microloans integration
- Mentorship programs
- Advanced analytics and reporting

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js 18.x
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcryptjs
- **Environment:** dotenv for configuration

### Frontend
- **Framework:** React 19.1.0
- **Build Tool:** Vite 7.0.4
- **Routing:** React Router DOM 7.7.1
- **Styling:** Tailwind CSS 4.1.11
- **HTTP Client:** Axios 1.11.0

### Key Dependencies
- **CORS** for cross-origin requests
- **JWT-decode** for token handling
- **Nodemon** for development

## 🚀 Deployment

**Platform:** Render  
**URL:** [https://gigpay-new.onrender.com](https://gigpay-new.onrender.com)  
**Status:** Production Ready ✅

### Deployment Architecture
- **Frontend & Backend:** Full-stack deployment on Render
- **Database:** MongoDB Atlas (cloud-hosted)
- **Static Assets:** Served via Express.js
- **Environment:** Production optimized with automatic HTTPS

*Note: This is deployed on Render's free tier, so the first visit may have a brief startup delay.*

## 🛠️ Local Development
- Node.js 18.x or higher
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/king-ojay/gigpay-new.git
   cd gigpay
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

5. **Run the Application**
   
   **Development Mode:**
   ```bash
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from client directory, in new terminal)
   npm run dev
   ```
   
   **Production Mode:**
   ```bash
   # Backend
   npm start
   
   # Frontend
   npm run build
   npm run preview
   ```

### Access the Application

**🌐 Live Demo:** [https://gigpay-new.onrender.com](https://gigpay-new.onrender.com)

**Local Development:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/health

## 📱 User Types

### Job Seekers (Gig Workers)
- Skilled or semi-skilled individuals
- Students looking for part-time work
- Freelancers and artisans
- Anyone seeking flexible income opportunities

### Job Posters (Clients)
- Individuals needing household services
- Small businesses outsourcing tasks
- Anyone requiring short-term services

## 🔒 Security & Compliance

- **Authentication:** OTP verification and secure password hashing
- **Data Protection:** GDPR compliance and adherence to Rwanda's data protection regulations
- **Payment Security:** Escrow system for secure transactions
- **API Security:** HTTPS encryption and CORS configuration

## 📊 Performance Requirements

- **Search Response Time:** < 2 seconds for 95% of requests
- **Payment Processing:** < 5 seconds for mobile money transactions
- **Uptime:** 99.9% availability target
- **Cross-Browser Support:** Chrome, Firefox, Safari, mobile browsers

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Health
- `GET /health` - System health check

**Development Model:** Agile methodology 

### Completed Features
- ✅ User authentication system
- ✅ Basic user management
- ✅ API structure and routing
- ✅ Database integration
- ✅ Frontend scaffolding

**Building sustainable employment opportunities, one gig at a time.** 🌟
