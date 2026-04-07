import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/forms/LoginForm";
import { Signup2 } from "./components/forms/SignupForm";
import AddCourseDashboard from "./pages/addCourse";
import CoursesList from "./pages/courses";
import CourseDetail from "./pages/courseDetail";
import Enrollment from "./pages/enrollment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup2 />} />
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
