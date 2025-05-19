import { HTMLInputTypeAttribute } from "react";
import { FieldValues, useFormContext, useFormState } from "react-hook-form";
import styles from "./Field.module.scss";
import { FieldErrors } from "./FieldErrors";

type FormFieldProps<TFormData extends FieldValues> = {
  property: keyof TFormData & string;
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  pattern?: RegExp;
};

export function FormField<TFormData extends FieldValues>({
  label,
  property,
  placeholder,
  type = "text",
  maxLength,
  minLength,
  readOnly,
  pattern,
  required = true,
}: FormFieldProps<TFormData>) {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const fieldError = errors[property];

  const patternRule: { pattern: RegExp } | {} = pattern
    ? { pattern: { value: pattern } }
    : {};
  const rules = { required, maxLength, minLength, ...patternRule };

  return (
    <label>
      <span className={required ? styles["label-required"] : ""}>{label}</span>
      <input
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
        className={fieldError ? styles["input-error"] : ""}
        {...register(property, rules)}
        aria-invalid={fieldError ? "true" : "false"}
      />
      <FieldErrors error={fieldError} />
    </label>
  );
}
