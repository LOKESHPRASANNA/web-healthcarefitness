# Gym Website

A modern gym website with both frontend and backend services.

## Project Structure

```
Gym Website/
├── backend/                 # Java Spring Boot backend
│   ├── build.gradle
│   ├── gradlew
│   └── src/
├── frontend/                # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── pages/          # HTML pages
│   │   ├── css/            # Stylesheets
│   │   ├── js/             # JavaScript files
│   │   └── components/     # Reusable components
│   └── index.html
├── package.json             # Node.js configuration
├── server.js                # Express server
├── .env                     # Environment variables
└── .gitignore
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Usually comes with Node.js

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd "Gym Website"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages specified in `package.json`:
   - **express** - Web server framework
   - **cors** - Enable cross-origin requests
   - **dotenv** - Load environment variables
   - **nodemon** - Auto-reload on file changes (dev only)

## Running the Project

### Option 1: Production Mode
```bash
npm start
```
This runs your server using Node.js directly on port 3000.

### Option 2: Development Mode (Recommended)
```bash
npm run dev
```
This runs the server with **nodemon**, which automatically restarts the server whenever you make changes to your files.

## Accessing Your Website

Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see your Gym Website homepage.

### Available Pages

The following routes are configured:
- **Home**: `http://localhost:3000/` → `frontend/src/pages/index.html`
- **Login**: `http://localhost:3000/login` → `frontend/src/pages/log-in.html`
- **Signup**: `http://localhost:3000/signup` → `frontend/src/pages/signup.html`
- **Admin Dashboard**: `http://localhost:3000/admin` → `frontend/src/pages/admin_dashboard.html`
- **Medicinal Plants**: `http://localhost:3000/plants` → `frontend/src/pages/medicinal_plants.html`
- **Proteins & Vitamins**: `http://localhost:3000/nutrition` → `frontend/src/pages/proteins_vitamins.html`
- **Payment**: `http://localhost:3000/payment` → `frontend/src/pages/payment.html`

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the server in production mode |
| `npm run dev` | Start the server with auto-reload (development) |
| `npm stop` | Documentation for stopping the server |
| `npm install` | Install dependencies |

## Configuration

The project uses a `.env` file for configuration:

```
PORT=3000
NODE_ENV=development
```

You can modify these values to change:
- **PORT**: The port number where the server runs (default: 3000)
- **NODE_ENV**: Environment mode (development/production)

## Frontend Assets

The Express server serves static files from two directories:
- **`frontend/src/`** - Your HTML, CSS, and JavaScript files
- **`frontend/public/`** - Images and other static assets

Make sure your `frontend/src` directory contains:
- **pages/** - HTML files for each page
- **css/** - CSS stylesheets
- **js/** - JavaScript files
- **components/** - Reusable UI components
- **images/** - Image assets

## Backend Integration

Your Java Spring Boot backend is located in the `backend/` directory. To run both frontend and backend:

1. **Terminal 1 - Frontend:**
   ```bash
   npm start
   ```

2. **Terminal 2 - Backend:** (from backend directory)
   ```bash
   ./gradlew bootRun
   ```

## Troubleshooting

### Port 3000 Already in Use
If port 3000 is already in use, change it in the `.env` file:
```
PORT=3001
```

### Module Not Found Error
Ensure dependencies are installed:
```bash
npm install
```

### Files Not Found
Check that your HTML files are in `frontend/src/pages/` and CSS/JS files are properly linked in your HTML.

## Development Tips

- **Use `npm run dev`** during development for auto-reload
- **Keep your static files** in the `frontend/src/` and `frontend/public/` directories
- **Update routes in `server.js`** if you add new pages
- **Use browser DevTools** to debug frontend issues

## License

ISC

---

**Happy coding! 🏋️💪**
