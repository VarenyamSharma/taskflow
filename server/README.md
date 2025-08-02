# TaskFlow Backend API

A robust Express.js backend API for the TaskFlow task management system with comprehensive security, authentication, and task management features.

## 🚀 Features

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with configurable salt rounds
- **Rate Limiting**: Multiple rate limiters for different endpoints
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet Security**: Security headers and XSS protection
- **Input Sanitization**: NoSQL injection and XSS prevention
- **Request Validation**: Comprehensive input validation with express-validator

### 📊 Task Management
- **CRUD Operations**: Complete task lifecycle management
- **Advanced Filtering**: Search, filter by priority/status, sorting
- **Pagination**: Efficient data retrieval with pagination
- **Task Statistics**: Dashboard analytics and insights
- **Bulk Operations**: Update multiple tasks simultaneously
- **Archive System**: Soft delete with archive functionality

### 🛠️ Technical Features
- **MongoDB Integration**: Mongoose ODM with optimized schemas
- **Comprehensive Logging**: Winston logger with multiple transports
- **Error Handling**: Centralized error handling with detailed logging
- **Environment Configuration**: Flexible environment-based configuration
- **Database Indexing**: Optimized database queries with proper indexing
- **Graceful Shutdown**: Proper cleanup on application termination

## 📋 Prerequisites

- Node.js 18+
- MongoDB 5.0+
- npm or yarn

## 🔧 Installation

1. **Clone and navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment setup:**
```bash
cp .env.example .env
```

4. **Configure environment variables:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
BCRYPT_SALT_ROUNDS=12
```

5. **Start the server:**
```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

#### Change Password
```http
PUT /api/auth/password
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "NewSecurePass123"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks?page=1&limit=10&search=project&priority=high&status=todo&sortBy=createdAt&sortOrder=desc
Authorization: Bearer <jwt_token>
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "priority": "high",
  "status": "todo",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "tags": ["documentation", "project"]
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "in-progress"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>
```

#### Get Task Statistics
```http
GET /api/tasks/stats
Authorization: Bearer <jwt_token>
```

#### Archive/Unarchive Task
```http
PATCH /api/tasks/:id/archive
Authorization: Bearer <jwt_token>
```

#### Bulk Update Tasks
```http
PATCH /api/tasks/bulk
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "taskIds": ["task_id_1", "task_id_2"],
  "updates": {
    "status": "completed"
  }
}
```

## 🏗️ Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task management logic
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handling
│   ├── rateLimiter.js      # Rate limiting configurations
│   └── validation.js       # Input validation rules
├── models/
│   ├── User.js             # User schema and methods
│   └── Task.js             # Task schema and methods
├── routes/
│   ├── auth.js             # Authentication routes
│   └── tasks.js            # Task management routes
├── utils/
│   └── logger.js           # Winston logging configuration
├── logs/                   # Log files directory
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── server.js               # Main application entry point
```

## 🔒 Security Features

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Authentication**: 5 attempts per 15 minutes
- **Task Operations**: 200 requests per 15 minutes

### Input Validation
- **Email Format**: RFC compliant email validation
- **Password Strength**: Minimum 6 characters with complexity requirements
- **MongoDB ObjectId**: Proper ObjectId format validation
- **XSS Protection**: Input sanitization against cross-site scripting

### Security Headers
- **Helmet.js**: Comprehensive security headers
- **CORS**: Configurable cross-origin resource sharing
- **Content Security Policy**: XSS protection
- **NoSQL Injection**: MongoDB query sanitization

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique, 3-30 chars),
  email: String (unique, valid email),
  password: String (hashed with bcrypt),
  role: String (user/admin),
  isActive: Boolean,
  lastLogin: Date,
  passwordChangedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required, max 200 chars),
  description: String (max 1000 chars),
  priority: String (low/medium/high),
  status: String (todo/in-progress/completed),
  user: ObjectId (ref: User),
  dueDate: Date,
  completedAt: Date,
  tags: [String],
  isArchived: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/taskflow
JWT_SECRET=your-production-jwt-secret-key
CLIENT_URL_PROD=https://your-frontend-domain.com
BCRYPT_SALT_ROUNDS=12
LOG_LEVEL=info
```

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### MongoDB Atlas Setup
1. Create MongoDB Atlas cluster
2. Configure network access and database user
3. Get connection string for MONGODB_URI_PROD

## 📈 Performance Optimizations

### Database Indexing
- User email and username indexes
- Task user and status compound indexes
- Text search indexes for title and description
- Date-based indexes for efficient sorting

### Query Optimization
- Pagination with limit and skip
- Selective field population
- Aggregation pipelines for statistics
- Efficient filtering with MongoDB operators

### Caching Strategy
- JWT token validation caching
- Database connection pooling
- Compression middleware for responses

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📝 Logging

### Log Levels
- **Error**: Application errors and exceptions
- **Warn**: Warning messages and rate limit violations
- **Info**: General application information
- **HTTP**: Request/response logging
- **Debug**: Detailed debugging information

### Log Files
- `logs/error.log`: Error-level logs only
- `logs/combined.log`: All log levels
- Console output for development

## 🔧 Configuration

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| CLIENT_URL | Frontend URL for CORS | - |
| BCRYPT_SALT_ROUNDS | Password hashing rounds | 12 |
| LOG_LEVEL | Logging level | info |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API examples

---

Built with ❤️ using Express.js, MongoDB, and modern Node.js practices.