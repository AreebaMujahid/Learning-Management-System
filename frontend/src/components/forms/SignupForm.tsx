import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
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
    title: "shadcnblocks.com",
  },
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "https://shadcnblocks.com",
  className,
}: Signup2Props) => {
  return (
    // min-h-screen ensure karta hai ke poori screen cover ho
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

          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              {buttonText}
            </Button>
          </div>
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
