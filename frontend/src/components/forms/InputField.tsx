import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

interface InputFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  className?: string;
}

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  className,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext(); // AuthForm wrapper se context leta hai

  const isPassword = type === "password";
  const error = errors[name];

  return (
    <div className={cn("grid w-full gap-1.5", className)}>
      <Label htmlFor={name} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      <div className="relative">
        <Input
          {...register(name)} // RHF registration
          id={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className={cn(
            error ? "border-destructive focus-visible:ring-destructive" : "",
            isPassword ? "pr-10" : "",
          )}
        />

        {/* Password Toggle Button */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {/* Error Message Section */}
      {error && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {error.message as string}
        </p>
      )}
    </div>
  );
};
