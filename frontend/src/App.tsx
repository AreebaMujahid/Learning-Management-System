import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/forms/LoginForm";
import { Signup2 } from "./components/forms/SignupForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup2 />} />
        {/* Default route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
