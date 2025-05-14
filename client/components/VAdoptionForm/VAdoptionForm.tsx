import { Animal } from "@prisma-app/client";
import { Modal } from "components/Modal";
import { useState } from "react";
import { VAdoptionModalContent } from "./VAdoptionModalContent/VAdoptionModalContent";
import { useFetchAccountNo } from "./VAdoptionModalContent/useFetchAccountNo";
import {
  FullName,
  Email,
  VCaretakerName,
  AdditionalMessage,
} from "../Form/FormComponents";
import { Form } from "../Form/Form";
import { submitVAdoptionForm } from "api/mutations";
import { Captcha } from "components/Captcha";
import { useFormDataState } from "util/useFormDataState";
import { useErrorModal } from "components/SimpleModal/useErrorModal";
import { useMutation } from "@tanstack/react-query";

export function VAdoptionForm({ animal }: { animal: Animal }) {
  const adoptionModalProps = useFetchAccountNo();

  const [formData, setFormData] = useFormDataState({
    fullName: "",
    vCaretakerName: "",
    email: "",
    additionalMessage: "",
    captchaToken: null,
  });

  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [errorModal, showErrorModal] = useErrorModal();

  const submit = useMutation({
    mutationFn: () => {
      const animalData = {
        animalId: animal.id,
        animalName: animal.name,
        animalRefNo: animal.refNo,
      };
      return submitVAdoptionForm({
        ...formData,
        ...animalData,
      });
    },
    onError: showErrorModal,
    onSuccess: () => setShowAdoptionModal(true),
  });

  return (
    <>
      <Form handleSubmit={submit.mutate}>
        {(triedSubmitCounter: number) => (
          <>
            <div className="form-grid-2">
              <label>
                Imię
                <input readOnly defaultValue={animal.name} />
              </label>
              <label>
                Numer ewidencyjny
                <input readOnly defaultValue={animal.refNo} />
              </label>
            </div>
            <div className="form-grid-2">
              <FullName
                value={formData.fullName}
                setValue={setFormData("fullName")}
                triedSubmitCounter={triedSubmitCounter}
              />
              <Email
                value={formData.email}
                setValue={setFormData("email")}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <VCaretakerName
              value={formData.vCaretakerName}
              setValue={setFormData("vCaretakerName")}
              triedSubmitCounter={triedSubmitCounter}
            />
            <AdditionalMessage
              value={formData.additionalMessage}
              setValue={setFormData("additionalMessage")}
            />
            <div className="form-grid-3">
              <Captcha onCaptcha={setFormData("captchaToken")} />
              <button
                disabled={!formData.captchaToken}
                className="form--button"
              >
                Wyślij
              </button>
            </div>
          </>
        )}
      </Form>
      <Modal
        isOpen={showAdoptionModal}
        onRequestClose={() => setShowAdoptionModal(false)}
      >
        <VAdoptionModalContent {...adoptionModalProps} />
      </Modal>
      {errorModal}
    </>
  );
}
