import { cn } from "../../../lib/utils";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/user-register";
import { AuthForm } from "../../../components/forms/AuthForm";
import { InputField } from "../../../components/forms/InputField";
import { signupSchema, type SignupValues } from "../schemas/signup-schema";
import { SelectField } from "../../../components/forms/SelectField";
import { toast } from "sonner";
import { UserRole } from "../../../enums/user-role";
interface SignupProps {
  heading?: string;
  buttonText?: string;
  signupText?: string;
  className?: string;
}
const Signup = ({
  heading = "Signup",
  buttonText = "Create Account",
  signupText = "Already a user?",
  className,
}: SignupProps) => {
  const { mutate, isPending } = useRegister();
  const handleSignup = (data: SignupValues, methods: any) => {
    const { confirmPassword, ...signupData } = data;
    mutate(signupData, {
      onSuccess: () => {
        // Professional approach: Success notification + Clear form
        toast.success("Account created successfully!");
        methods.reset();
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Registration failed!";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <section
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-muted p-4",
        className,
      )}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="w-full rounded-lg border border-border bg-background p-8 shadow-lg">
          {/* Header Section */}
          <div className="mb-6 flex flex-col items-center gap-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
            <p className="text-sm text-muted-foreground text-center">
              Enter your details below to create your account
            </p>
          </div>

          {/* New Modular Form */}
          <AuthForm
            schema={signupSchema}
            defaultValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: UserRole.LEARNER,
            }}
            buttonText="Create Account"
            onSubmit={handleSignup}
            isPending={isPending}
          >
            <InputField name="name" label="Name" placeholder="John Doe" />
            <InputField
              name="email"
              label="Email"
              placeholder="name@example.com"
            />

            {/* Password Fields with Eye toggle logic inside InputField or separate component */}
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
            />

            {/* Modular Role Selection */}
            <SelectField
              name="role"
              label="Join as"
              placeholder="Select a role"
              options={[
                { label: "Learner", value: UserRole.LEARNER },
                { label: "Mentor", value: UserRole.MENTOR },
              ]}
            />
          </AuthForm>
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

export { Signup };
