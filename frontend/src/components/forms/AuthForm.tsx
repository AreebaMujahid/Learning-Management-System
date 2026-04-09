import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

interface AuthFormProps {
  schema: any;
  defaultValues: any;
  onSubmit: (data: any, methods: any) => void;
  children: React.ReactNode;
  buttonText: string;
  isPending?: boolean;
}

export const AuthForm = ({
  schema,
  defaultValues,
  onSubmit,
  children,
  buttonText,
  isPending,
}: AuthFormProps) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        className="space-y-4"
      >
        {children}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Processing..." : buttonText}
        </Button>
      </form>
    </FormProvider>
  );
};
