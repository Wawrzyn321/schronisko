import { FieldValues, useFormContext } from "react-hook-form";

type TextareaFormFieldProps<TFormData extends FieldValues> = {
  property: keyof TFormData;
  maxLength: number;
  required?: boolean;
  label: string;
  rows?: number;
  placeholder?: string;
};

export function TextareaFormField<TFormData extends FieldValues>({
  property,
  required,
  label,
  maxLength,
  rows = 7,
  placeholder,
}: TextareaFormFieldProps<TFormData>) {
  const { register } = useFormContext();

  return (
    <label>
      {label}
      <textarea
        {...register(property as string, { required })}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {/* <p className="validation-message">{showMessage && "Uzupełnij pole"}</p> */}
    </label>
  );
}
