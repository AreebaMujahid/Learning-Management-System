import { useState } from "react"; // 1. Import added
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../../features/auth/hooks/user-register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface Signup2Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Signup2 = ({
  heading = "Signup",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "LMS",
  },
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "https://shadcnblocks.com",
  className,
}: Signup2Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string>("learner");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    mutate(
      { name, email, password, role },
      {
        onSuccess: (data) => {
          console.log("Backend Response:", data);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setRole("learner");
          alert("Account created successfully!");
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "Registration failed!";
          alert(errorMessage);
        },
      },
    );
  };
  return (
    <section
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-muted p-4",
        className,
      )}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Logo Section */}
        <a href={logo.url} className="mb-2">
          <img
            src={logo.src}
            alt={logo.alt}
            title={logo.title}
            className="h-10 dark:invert"
          />
        </a>

        {/* Form Card */}
        <div className="w-full rounded-lg border border-border bg-background p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-y-2">
            {heading && (
              <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Enter your details below to create your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="grid w-full gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Email Field */}
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="grid w-full gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="role">Join as</Label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="learner">Learner</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full mt-2" disabled={isPending}>
              {isPending ? "Creating Account..." : buttonText}
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="flex justify-center gap-1 text-sm text-muted-foreground">
          <p>{signupText}</p>
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
export { Signup2 };
