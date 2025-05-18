import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
} from "react-hook-form";
import styles from "./Form.module.scss";
import { FormField } from "./Field";
import { TextareaFormField } from "./TextareaFormField";
import { SubmitButton } from "./SubmitButton";
import { FormCaptcha } from "./FormCaptcha";

type Props<TFormData extends FieldValues> = {
  handleFormSubmit: (formData: TFormData) => void;
  children: React.ReactNode;
  defaultValues: UseFormProps<TFormData>["defaultValues"];
};

export function Form<TFormData extends FieldValues>({
  handleFormSubmit,
  children,
  defaultValues,
}: Props<TFormData>) {
  const formMethods = useForm({
    mode: "onChange",
    defaultValues,
  });

  return (
    <FormProvider<TFormData> {...formMethods}>
      <form
        className={styles["form"]}
        onSubmit={formMethods.handleSubmit(handleFormSubmit)}
        noValidate
      >
        <p className={styles["form-required-data-info"]}>
          * Wymagane informacje
        </p>
        {children}
      </form>
    </FormProvider>
  );
}

Form.Field = FormField;
Form.Textarea = TextareaFormField;
Form.SubmitButton = SubmitButton;
Form.Captcha = FormCaptcha;
