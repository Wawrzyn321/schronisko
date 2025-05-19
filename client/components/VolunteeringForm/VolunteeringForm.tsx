import { submitVolunteeringForm } from "api/mutations";
import { Form } from "../Form/Form";
import { useErrorModal } from "components/SimpleModal/useErrorModal";
import { useSuccessModal } from "components/SimpleModal/useSuccessModal";
import { useMutation } from "@tanstack/react-query";
import { AnimalType } from "@prisma-app/client";
import { VolunteeringFormData } from "types";

type Props = {
  animalType: AnimalType;
};

const DEFAULT_VALUES: VolunteeringFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  about: "",
  captchaToken: null,
};

export function VolunteeringForm({ animalType }: Props) {
  const [successModal, showSuccessModal] = useSuccessModal();
  const [errorModal, showErrorModal] = useErrorModal();

  const submitMutation = useMutation({
    mutationFn: (formData: typeof DEFAULT_VALUES) =>
      submitVolunteeringForm(formData, animalType),
    onError: showErrorModal,
    onSuccess: showSuccessModal,
  });

  return (
    <>
      <Form
        defaultValues={DEFAULT_VALUES}
        handleFormSubmit={submitMutation.mutate}
      >
        <div className="form-grid-2">
          <Form.Field<VolunteeringFormData>
            property="fullName"
            label="Imię i nazwisko"
            placeholder="Nie przetwarzamy danych"
            maxLength={50}
            minLength={3}
          />
          <Form.Field<VolunteeringFormData>
            property="phoneNumber"
            label="Numer telefonu"
            placeholder="Telefon kontaktowy"
            type="tel"
            minLength={9}
          />
        </div>
        <div className="form-grid-2">
          <Form.Field<VolunteeringFormData>
            property="email"
            label="Email"
            placeholder="Email do kontaktu"
            type="email"
            maxLength={120}
            pattern={/\S+@\S+\.\S+/}
          />
          <Form.Field<VolunteeringFormData>
            property="birthDate"
            label="Data urodzenia"
            type="date"
          />
        </div>
        <Form.Textarea<VolunteeringFormData>
          property="about"
          required
          maxLength={160}
          label="Coś o sobie"
          placeholder="Kilka słów o sobie, posiadane zwierzęta, poprzednie doświadczenie"
        />
        <div className="form-grid-3">
          <Form.Captcha />
          <Form.SubmitButton>Wyślij</Form.SubmitButton>
        </div>
      </Form>
      {successModal}
      {errorModal}
    </>
  );
}
