import "./App.css";
import { Signup2 } from "./components/forms/SignupForm";
function App() {
  return (
    <>
      <Signup2
        heading="Create your Account"
        buttonText="Sign Up"
        signupText="Already have an account?"
        signupUrl="/login"
      />
    </>
  );
}

export default App;
