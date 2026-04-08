import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { GraduationCap } from "lucide-react"; // Hero icon for LMS
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../features/auth/hooks/user-login";
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
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

          {/* Form Elements */}
          <div className={cn("grid gap-6")}>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button className="mt-2" type="submit" disabled={isPending}>
                  {isPending ? "Logging in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </div>

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
