# TaskFlow - Full-Stack Task Management System

A modern, full-featured task management application built with React, TypeScript, Node.js, MongoDB, and Tailwind CSS. This project demonstrates a complete full-stack architecture with secure authentication, CRUD operations, advanced filtering, and a beautiful responsive UI.

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication system with MongoDB token storage
- Secure refresh token mechanism
- User registration and login with MongoDB persistence
- Protected routes and middleware
- Secure password hashing with bcrypt
- Token validation and automatic refresh

### 📋 Task Management
- Create, read, update, and delete tasks
- Task properties: title, description, priority, status, timestamps
- Priority levels: Low, Medium, High
- Status tracking: To Do, In Progress, Completed
- User-specific task isolation
- MongoDB persistence for reliable data storage

### 🔍 Advanced Features
- Real-time search functionality
- Filter by priority and status
- Sort by multiple criteria (date, title, priority, status)
- Comprehensive task statistics dashboard
- Responsive mobile-first design
- User preferences stored in MongoDB

### 🎨 Modern UI/UX
- Light/Dark theme toggle with server-side persistence
- Beautiful animations and micro-interactions
- Professional color palette and typography
- Accessible design patterns
- Mobile-responsive layout

### 🏗️ Technical Architecture
- React 18 with TypeScript for frontend
- Node.js and Express for backend
- MongoDB with Mongoose for data persistence
- JWT-based authentication with refresh tokens
- Context API for global state management
- Custom hooks for business logic
- Modular component architecture
- Tailwind CSS for styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 4.4+
- npm or yarn

### Environment Setup

1. Create `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

2. Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskflow
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ..
npm install
```

4. Start the backend server:
```bash
cd server
npm run dev
```

5. Start the frontend development server:
```bash
cd ..
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

### Getting Started
1. **Register/Login**: Create a new account or login with existing credentials
2. **Dashboard**: View your task statistics and personalized overview
3. **Create Tasks**: Click "New Task" to add tasks with title, description, priority, and status
4. **Manage Tasks**: Edit, update, or delete tasks using the card actions
5. **Filter & Search**: Use the advanced filtering system to find specific tasks
6. **Theme**: Toggle between light and dark modes (automatically synced across devices)
7. **Preferences**: Customize your experience with persistent user preferences

### Features Overview

#### Authentication
- Secure JWT-based authentication
- Token refresh mechanism for persistent sessions
- Server-side token storage and validation

#### Task Management
- **Title**: Brief description of the task (required)
- **Description**: Detailed task information (optional)
- **Priority**: Low, Medium, or High priority levels
- **Status**: To Do, In Progress, or Completed
- **Timestamps**: Automatic creation and update tracking
- **Data Persistence**: All tasks stored securely in MongoDB

#### User Preferences
- Theme preference (Light/Dark)
- Notification settings
- Personalized dashboard layout
- Cross-device synchronization

## 🏗️ Project Structure

```
taskflow/
├── src/                # Frontend source code
│   ├── components/     # Reusable UI components
│   │   ├── Dashboard.tsx       # Main dashboard with stats
│   │   ├── LoginForm.tsx      # Authentication form
│   │   ├── Navbar.tsx         # Navigation with theme toggle
│   │   ├── TaskCard.tsx       # Task display component
│   │   ├── TaskForm.tsx       # Task creation/editing
│   │   ├── TaskFilters.tsx    # Filtering interface
│   │   └── LoadingSpinner.tsx # Loading states
│   ├── contexts/       # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   ├── TaskContext.tsx    # Task management
│   │   └── ThemeContext.tsx   # Theme preferences
│   └── utils/          # Utility functions
│       └── api.ts      # API client configuration
│
└── server/            # Backend source code
    ├── config/        # Configuration files
    │   └── database.js # MongoDB configuration
    ├── controllers/   # Route controllers
    │   ├── authController.js  # Auth logic
    │   └── taskController.js  # Task logic
    ├── middleware/    # Express middleware
    │   ├── auth.js           # JWT validation
    │   └── errorHandler.js   # Error handling
    ├── models/        # Mongoose models
    │   ├── User.js          # User schema
    │   ├── Task.js          # Task schema
    │   └── Token.js         # JWT token schema
    └── routes/        # API routes
        ├── auth.js          # Auth endpoints
        └── tasks.js         # Task endpoints
│   ├── TaskContext.tsx  # Task CRUD operations
│   └── ThemeContext.tsx # Theme state management
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared interfaces and types
├── utils/               # Utility functions
│   ├── api.ts           # Simulated API operations
│   └── auth.ts          # Authentication utilities
├── App.tsx              # Main application component
├── main.tsx             # React DOM entry point
└── index.css            # Global styles and Tailwind imports
```

## 🔧 Technical Implementation

### State Management
- **React Context API**: Global state management for authentication, tasks, and theme
- **Custom Hooks**: Encapsulated business logic and API interactions
- **Local State**: Component-specific state for forms and UI interactions

### Data Flow
1. **Authentication**: JWT tokens stored in localStorage with automatic validation
2. **Task Operations**: CRUD operations through context providers
3. **Real-time Updates**: Immediate UI updates with optimistic rendering
4. **Error Handling**: Comprehensive error states and user feedback

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Flexible grid layouts and adaptive navigation
- Touch-friendly interactions on mobile devices

## 🚀 Deployment Architecture

This application is designed for modern deployment platforms:

### Frontend (Recommended: Vercel)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables for API endpoints

### Backend (Recommended: Railway/Heroku)
- Node.js/Express server
- MongoDB database integration
- JWT authentication middleware
- CORS configuration for frontend domain

### Database (Recommended: MongoDB Atlas)
- User collection with authentication data
- Tasks collection with user relationships
- Indexes for efficient querying
- Connection pooling and security

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security (simulated)
- **Route Protection**: Middleware for protected endpoints
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Proper cross-origin resource sharing

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) for main actions and branding
- **Success**: Green (#10B981) for completed states
- **Warning**: Yellow (#F59E0B) for medium priority
- **Error**: Red (#EF4444) for high priority and errors
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: System fonts with fallbacks
- **Headings**: 120% line height, semibold weight
- **Body Text**: 150% line height, regular weight
- **Small Text**: 140% line height for better readability

### Spacing System
- **Base Unit**: 8px spacing system
- **Consistent Margins**: 4, 8, 16, 24, 32px increments
- **Grid System**: Responsive flex and grid layouts

## 🔄 State Management Patterns

### Authentication Flow
```typescript
Login → JWT Token → localStorage → Context State → Protected Routes
```

### Task Management Flow
```typescript
User Action → Context Method → API Call → State Update → UI Rerender
```

### Theme Management Flow
```typescript
Toggle → Context State → localStorage → CSS Classes → Visual Update
```

## 📊 Performance Optimizations

- **Memoization**: useMemo for expensive computations
- **Component Optimization**: Proper key props and React.memo
- **Lazy Loading**: Code splitting for better initial load
- **Image Optimization**: Efficient asset loading
- **Bundle Analysis**: Webpack bundle optimization

## 🧪 Testing Strategy

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Context and API interaction testing
- **E2E Tests**: Complete user journey testing
- **Accessibility Tests**: WCAG compliance verification

## 🔮 Future Enhancements

- **Real-time Collaboration**: WebSocket integration
- **Task Categories**: Custom categorization system
- **File Attachments**: Document and image uploads
- **Due Dates**: Calendar integration and reminders
- **Team Management**: Multi-user collaboration
- **Advanced Analytics**: Task completion insights
- **Mobile App**: React Native implementation
- **Offline Support**: Progressive Web App features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@taskflow.dev or open an issue on GitHub.

---

Built with ❤️ by [Your Name] using React, TypeScript, and Tailwind CSS.