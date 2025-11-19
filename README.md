# Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- Responsive design
- Modern UI components

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** authentication
- **Express Validator** for input validation
- **Helmet** for security
- **Rate limiting** for API protection
- **CORS** configuration

### Pages

- **Home**: Hero section with skills overview
- **About**: Personal information and experience
- **Projects**: Portfolio showcase with filtering
- **Contact**: Contact form with validation

## Project Structure

```
cs-portfolio-website/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── package.json             # Root package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd cs-portfolio-website
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp backend/env.example backend/.env

   # Edit the .env file with your configuration
   nano backend/.env
   ```

4. **Configure MongoDB**
   - For local MongoDB: Ensure MongoDB is running on `mongodb://localhost:27017`
   - For MongoDB Atlas: Update the `MONGODB_URI` in your `.env` file

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# CORS Origins
CORS_ORIGIN=http://localhost:3000

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Development

### Start both frontend and backend

```bash
npm run dev
```

### Start frontend only

```bash
npm run dev:frontend
```

### Start backend only

```bash
npm run dev:backend
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (Admin only)
- `GET /api/contact/:id` - Get single message (Admin only)
- `PUT /api/contact/:id/status` - Update message status (Admin only)
- `DELETE /api/contact/:id` - Delete message (Admin only)

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Health Check

- `GET /api/health` - Server health status

## Building for Production

### Build both frontend and backend

```bash
npm run build
```

### Build frontend only

```bash
npm run build:frontend
```

### Build backend only

```bash
npm run build:backend
```

### Start production server

```bash
cd backend
npm start
```

## Customization

### Adding New Projects

1. Use the admin panel (login with admin credentials)
2. Or add directly to the database
3. Or use the API endpoints

### Styling

- Modify `frontend/tailwind.config.js` for theme customization
- Update `frontend/src/index.css` for global styles
- Component styles are in individual component files

### Content

- Update personal information in `frontend/src/pages/About.tsx`
- Modify project data in `frontend/src/pages/Projects.tsx`
- Update contact information in `frontend/src/pages/Contact.tsx`

## Default Admin Credentials

After seeding the database, you can login with:

- **Email**: admin@example.com
- **Password**: admin123

**Important**: Change these credentials in production!

## Technologies Used

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Axios

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Express Validator
- Helmet
- CORS
- Bcryptjs
- Express Rate Limit

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue in the repository.
