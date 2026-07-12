import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import AIChatWidget from './components/AIChatWidget';
import DashboardLayout from './components/DashboardLayout';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// SaaS Modules
import Dashboard from './pages/Dashboard';
import Nutrition from './pages/Nutrition';
import Workouts from './pages/Workouts';
import Progress from './pages/Progress';
import Attendance from './pages/Attendance';
import Schedule from './pages/Schedule';
import Membership from './pages/Membership';
import Payments from './pages/Payments';
import Community from './pages/Community';
import AICoach from './pages/AICoach';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Use Standard Layout) */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col relative bg-primary-light dark:bg-primary-dark">
              <Navbar />
              <main className="flex-1"><Home /></main>
              <AIChatWidget />
            </div>
          } />
          <Route path="/login" element={
            <div className="min-h-screen flex flex-col relative bg-primary-light dark:bg-primary-dark">
              <Navbar />
              <main className="flex-1"><Login /></main>
              <AIChatWidget />
            </div>
          } />
          <Route path="/signup" element={
            <div className="min-h-screen flex flex-col relative bg-primary-light dark:bg-primary-dark">
              <Navbar />
              <main className="flex-1"><Signup /></main>
              <AIChatWidget />
            </div>
          } />

          {/* Protected SaaS Routes (Use DashboardLayout) */}
          <Route path="/*" element={
            <PrivateRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/ai-coach" element={<AICoach />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                  
                  {/* Fallback redirect */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
