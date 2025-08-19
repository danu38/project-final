import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForumPage from "./pages/FotumPage";
import Navbar from "./pages/Navbar";
import DiscussionPage from "./pages/DiscussionPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<ForumPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          <Route path="/post/:id" element={<DiscussionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;