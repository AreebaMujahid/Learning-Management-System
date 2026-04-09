import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./features/auth/components/LoginForm";
import { Signup } from "./features/auth/components/SignupForm";
import AddCourseDashboard from "./pages/addCourse";
import CoursesList from "./pages/courses";
import CourseDetail from "./pages/courseDetail";
import Enrollment from "./pages/enrollment";
import { Toaster } from "sonner";
function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/add-course" element={<AddCourseDashboard />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/course" element={<CourseDetail />} />
        <Route path="/enrollment" element={<Enrollment />} />
      </Routes>
    </Router>
  );
}

export default App;
