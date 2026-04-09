import { GraduationCap } from "lucide-react"; // Hero icon for LMS
import { Link } from "react-router-dom";
import { loginSchema, type loginValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/user-login";
import { toast } from "sonner";
import { AuthForm } from "../../../components/forms/AuthForm";
import { InputField } from "../../../components/forms/InputField";
export function LoginPage() {
  const { mutate, isPending } = useLogin();
  const handleLogin = (data: loginValues, methods: any) => {
    (mutate(data),
      {
        onSuccess: () => {
          toast.success("Login successfully!");
          methods.reset();
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "Login failed!";
          toast.error(errorMessage);
        },
      });
  };
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* --- Left Side: Branding/Image (Visible only on Desktop) --- */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />{" "}
        {/* Background overlay */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <GraduationCap className="mr-2 h-6 w-6" />
          LMS Portal
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has transformed how I manage my courses and
              interact with my mentors."
            </p>
            <footer className="text-sm">Areeba Mujahid - Lead Developer</footer>
          </blockquote>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* Header */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to access your dashboard
            </p>
          </div>

          <AuthForm
            schema={loginSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            buttonText="Login"
            onSubmit={handleLogin}
            isPending={isPending}
          >
            <InputField
              name="email"
              label="Email"
              placeholder="joh@gmail.com"
            />

            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
          </AuthForm>
          {/* Footer Text */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            Dont have an account?
            <Link
              to="/signup"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
