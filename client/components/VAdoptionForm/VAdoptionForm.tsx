import { Animal } from "@prisma-app/client";
import { Modal } from "components/Modal";
import { useState } from "react";
import { VAdoptionModalContent } from "./VAdoptionModalContent/VAdoptionModalContent";
import { Form } from "../Form/Form";
import { submitVAdoptionForm } from "api/mutations";
import { useErrorModal } from "components/SimpleModal/useErrorModal";
import { useMutation } from "@tanstack/react-query";
import { VAdoptionFormData } from "types";
import { getZodIsses } from "api/error";

const DEFAULT_VALUES: VAdoptionFormData = {
  fullName: "",
  vCaretakerName: "",
  email: "",
  additionalMessage: "",
  captchaToken: null,
  animalId: "",
  animalName: "",
  animalRefNo: "",
};

export function VAdoptionForm({ animal }: { animal: Animal }) {
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [errorModal, showErrorModal] = useErrorModal();

  const defaultValues = {
    ...DEFAULT_VALUES,
    animalId: animal.id,
    animalName: animal.name,
    animalRefNo: animal.refNo,
  };

  const submitMutation = useMutation({
    mutationFn: (formData: typeof DEFAULT_VALUES) => {
      return submitVAdoptionForm(formData);
    },
    onError: (error) => {
      console.log(getZodIsses(error));
      return showErrorModal();
    },
    onSuccess: () => setShowAdoptionModal(true),
  });

  return (
    <>
      <Form
        defaultValues={defaultValues}
        handleFormSubmit={submitMutation.mutate}
      >
        <div className="form-grid-2">
          <Form.Field<VAdoptionFormData>
            property="animalName"
            label="Imię zwierzęcia"
            readOnly
          />
          <Form.Field<VAdoptionFormData>
            property="animalRefNo"
            label="Numer ewidencyjny"
            readOnly
          />
        </div>
        <div className="form-grid-2">
          <Form.Field<VAdoptionFormData>
            property="fullName"
            label="Imię i nazwisko"
            placeholder="Nie przetwarzamy danych"
            maxLength={50}
            minLength={1}
          />
          <Form.Field<VAdoptionFormData>
            property="email"
            label="Email"
            placeholder="Email do kontaktu"
            type="email"
            maxLength={120}
            pattern={/\S+@\S+\.\S+/}
          />
        </div>
        <Form.Field<VAdoptionFormData>
          property="vCaretakerName"
          label="Moim wirtualnym opiekunem jest..."
          placeholder='Tu wpisz opis wyświetlany na stronie, na przykład "Hania z Gliwic", "klasa 3b z 17"'
          type="email"
          maxLength={120}
          minLength={1}
        />
        <Form.Textarea<VAdoptionFormData>
          property="additionalMessage"
          maxLength={160}
          label="Uwagi"
          placeholder="Dodatkowe uwagi"
        />
        <div className="form-grid-3">
          <Form.Captcha />
          <Form.SubmitButton>Wyślij</Form.SubmitButton>
        </div>
      </Form>
      <Modal
        isOpen={showAdoptionModal}
        onRequestClose={() => setShowAdoptionModal(false)}
      >
        <VAdoptionModalContent />
      </Modal>
      {errorModal}
    </>
  );
}
