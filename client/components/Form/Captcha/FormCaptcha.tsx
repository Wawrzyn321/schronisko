import { Controller, FieldValues } from "react-hook-form";
import { Captcha } from "./Captcha";

type FormCaptchaProps<TFormData extends FieldValues> = {
  property?: keyof TFormData & string;
};

export function FormCaptcha<TFormData extends FieldValues>({
  property = "captchaToken",
}: FormCaptchaProps<TFormData>) {
  return (
    <Controller
      name={property}
      render={({ field }) => <Captcha onCaptcha={field.onChange} />}
      rules={{ required: true }}
    />
  );
}
