import { HTMLInputTypeAttribute } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

type FormFieldProps<TFormData extends FieldValues> = {
  property: keyof TFormData & string;
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

export function FormField<TFormData extends FieldValues>({
  label,
  property,
  placeholder,
  type = "text",
  maxLength,
  readOnly,
  required = true,
}: FormFieldProps<TFormData>) {
  const { register } = useFormContext();

  return (
    <label>
      {label}
      {required ? " *" : ""}
      <input
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
        {...register(property, { required, maxLength })}
      />
      <p className="validation-message"></p>
    </label>
  );
}
