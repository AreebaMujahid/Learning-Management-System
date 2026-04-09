import { useFormContext, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../../lib/utils";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
}

export const SelectField = ({
  name,
  label,
  placeholder,
  options,
  className,
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // AuthForm se control lena

  const error = errors[name];

  return (
    <div className={cn("grid w-full gap-1.5", className)}>
      <Label htmlFor={name} className={error ? "text-destructive" : ""}>
        {label}
      </Label>

      {/* Shadcn Select ko RHF ke saath Controller ke zariye connect karna parta hai */}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              id={name}
              className={
                error ? "border-destructive focus:ring-destructive" : ""
              }
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {error.message as string}
        </p>
      )}
    </div>
  );
};
