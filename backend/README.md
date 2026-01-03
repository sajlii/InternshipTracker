# 📱 Internship Tracker - Full Stack Application

A comprehensive web application to track and manage internship applications with authentication, CRUD operations, and advanced filtering capabilities.

**Developed by:** Sajli (sajli0959@gmail.com)

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-blue)

---

## 🎯 Features

### Authentication & Security
- ✅ User registration with email validation
- ✅ Secure login with JWT authentication
- ✅ Password hashing using bcrypt (12 salt rounds)
- ✅ Protected routes requiring authentication
- ✅ Automatic token expiration (30 days)
- ✅ Secure logout functionality

### Internship Management (CRUD Operations)
- ✅ **Create:** Add new internship applications with detailed information
- ✅ **Read:** View all internships in a responsive card layout
- ✅ **Update:** Edit internship details at any time
- ✅ **Delete:** Remove internship applications with confirmation

### Advanced Features
- ✅ Real-time search across company name, position, and location
- ✅ Filter by application status (Wishlist, Applied, Interview, Offered, Rejected, Accepted)
- ✅ Filter by priority level (Low, Medium, High)
- ✅ Sort by date, company name, or status
- ✅ Statistics dashboard showing application metrics
- ✅ User profile management
- ✅ Responsive design for mobile, tablet, and desktop

### Additional Capabilities
- ✅ Application deadline tracking
- ✅ Salary and duration information
- ✅ Personal notes for each application
- ✅ Direct links to job postings
- ✅ Visual priority indicators (color-coded borders)
- ✅ Application status tracking with color-coded badges

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js 18.2.0
- **Routing:** React Router DOM 6.21.0
- **Styling:** TailwindCSS 3.4.0
- **HTTP Client:** Axios 1.6.2
- **Notifications:** React Hot Toast 2.4.1
- **Icons:** Lucide React 0.294.0

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.18.2
- **Database:** MongoDB (Atlas Cloud)
- **ODM:** Mongoose 8.0.3
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 2.4.3
- **Validation:** express-validator 7.0.1
- **Security:** CORS enabled

---

## 📁 Project Structure
internship-tracker/
│
├── backend/                    # Backend Node.js/Express API
│   ├── config/
│   │   └── database.js        # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── internshipController.js  # Internship CRUD logic
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification middleware
│   ├── models/
│   │   ├── User.js           # User schema with password hashing
│   │   └── Internship.js     # Internship schema with validations
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── internshipRoutes.js  # Internship endpoints
│   ├── utils/
│   │   └── tokenHelper.js    # JWT token generation/verification
│   ├── .env                  # Environment variables (NOT in git)
│   ├── server.js             # Express app entry point
│   └── package.json          # Backend dependencies
│
├── frontend/                  # Frontend React application
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── ProtectedRoute.jsx   # Route protection HOC
│   │   │   └── InternshipCard.jsx   # Internship display card
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state management
│   │   ├── pages/
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   └── Profile.jsx         # User profile page
│   │   ├── services/
│   │   │   └── api.js              # Axios configuration
│   │   ├── App.jsx           # Main app component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles with Tailwind
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── postcss.config.js     # PostCSS configuration
│   └── package.json          # Frontend dependencies
│   
├── README.md                 # This file

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone 
cd internship-tracker
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy .env.example to .env and configure:
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship_tracker_sajli
JWT_SECRET=your_secure_random_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development

# Start backend server
npm run dev
```

**Backend should run on:** `http://localhost:5000`

### 3. Frontend Setup
```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

**Frontend should open at:** `http://localhost:3000`

---

## 🔧 Environment Variables

### Backend `.env` Configuration
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship_tracker_sajli?retryWrites=true&w=majority
JWT_SECRET=generate_a_strong_random_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

**Important:**
- Replace `username` and `password` with your MongoDB credentials
- Generate a strong JWT secret (32+ characters)
- Never commit `.env` to version control

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "fullName": "Sajli",
  "email": "sajli0959@gmail.com",
  "password": "password123",
  "phone": "1234567890",
  "university": "XYZ University",
  "degree": "B.Tech",
  "graduationYear": 2025
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Sajli",
    "email": "sajli0959@gmail.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "sajli0959@gmail.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer 
```

#### Update User Profile
```http
PUT /auth/profile
Authorization: Bearer 
Content-Type: application/json

{
  "fullName": "Sajli Updated",
  "phone": "9876543210",
  "bio": "Aspiring software developer"
}
```

---

### Internship Endpoints

#### Create Internship
```http
POST /internships
Authorization: Bearer 
Content-Type: application/json

{
  "companyName": "Primetrade.ai",
  "position": "Front End Development",
  "location": "Hyderabad, India",
  "applicationType": "online",
  "status": "applied",
  "applicationDate": "2025-01-15",
  "deadline": "2025-02-01",
  "salary": "₹50,000/month",
  "duration": "6 months",
  "priority": "high",
  "websiteUrl": "https://careers.google.com",
  "jobDescription": "Full stack development internship...",
  "notes": "Applied through referral"
}
```

#### Get All Internships (with filters)
```http
GET /internships?status=applied&priority=high&search=google&sortBy=date
Authorization: Bearer 
```

#### Get Single Internship
```http
GET /internships/:id
Authorization: Bearer 
```

#### Update Internship
```http
PUT /internships/:id
Authorization: Bearer 
Content-Type: application/json

{
  "status": "interview",
  "notes": "Interview scheduled for next week"
}
```

#### Delete Internship
```http
DELETE /internships/:id
Authorization: Bearer 
```

#### Get Statistics
```http
GET /internships/statistics
Authorization: Bearer 
```

**Response:**
```json
{
  "success": true,
  "statistics": {
    "total": 15,
    "byStatus": {
      "wishlist": 3,
      "applied": 7,
      "interview": 2,
      "offered": 1,
      "rejected": 2,
      "accepted": 0
    }
  }
}
```

---

## 🎨 UI Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible mobile menu
- Touch-friendly buttons and inputs

### Color Scheme
- Primary: Blue gradient (#0ea5e9 to #0369a1)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Yellow (#f59e0b)

### Status Colors
- **Wishlist:** Gray
- **Applied:** Blue
- **Interview:** Yellow
- **Offered:** Green
- **Rejected:** Red
- **Accepted:** Purple

---

## 🔒 Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (12 salt rounds)
   - Never stored or returned in plain text
   - Minimum 6 characters required

2. **JWT Authentication**
   - Tokens expire after 30 days
   - Stored in localStorage (client-side)
   - Verified on every protected request

3. **Input Validation**
   - Server-side validation using express-validator
   - Client-side validation for immediate feedback
   - Email format validation
   - Phone number format validation (10 digits)

4. **CORS Protection**
   - Configured to only accept requests from frontend origin
   - Credentials support enabled

5. **Error Handling**
   - Global error handler
   - Sensitive information not exposed in production
   - Detailed errors only in development mode

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Register with valid data
- [ ] Register with duplicate email (should fail)
- [ ] Register with invalid email format (should fail)
- [ ] Register with short password (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Access protected routes without token (should redirect)
- [ ] Logout functionality

#### Internship Management
- [ ] Create new internship with all fields
- [ ] Create internship with only required fields
- [ ] View all internships
- [ ] Search internships by company name
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Sort by date/company/status
- [ ] Edit internship details
- [ ] Delete internship (with confirmation)
- [ ] View statistics

#### Profile Management
- [ ] View profile information
- [ ] Update profile with valid data
- [ ] Update profile with invalid phone (should fail)

---

## 🐛 Common Issues & Solutions

### Issue: Backend won't start
**Solution:**
- Check if MongoDB is running: `net start MongoDB`
- Verify `.env` file exists and is configured correctly
- Check if port 5000 is available: `netstat -ano | findstr :5000`

### Issue: Frontend can't connect to backend
**Solution:**
- Ensure backend is running on port 5000
- Check `frontend/src/services/api.js` has correct baseURL
- Verify CORS is enabled in backend

### Issue: MongoDB connection failed
**Solution:**
- Check MongoDB URI in `.env`
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure database user has correct permissions

### Issue: JWT token errors
**Solution:**
- Verify `JWT_SECRET` and `JWT_EXPIRE` are set in `.env`
- Clear localStorage and login again
- Check token is being sent in Authorization header

---

## 📈 Performance Optimizations

1. **Database Indexing**
   - Indexed on userId and status for faster queries
   - Compound index on applicationDate

2. **Frontend Optimizations**
   - React.memo for expensive components
   - Lazy loading for routes
   - Debounced search input

3. **API Response**
   - Only necessary fields returned
   - Pagination ready (can be implemented)

