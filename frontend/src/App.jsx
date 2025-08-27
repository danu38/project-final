import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForumPage from "./pages/ForumPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected route for forum */}
        <Route
          path="/forum"
          element={
            isAuthenticated ? <ForumPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Redirect root to login or forum */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/forum" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
