import { submitVolunteeringForm } from "api/mutations";
import { Form } from "../Form/Form";
import { Email, FullName, Tel, BirthDate, About } from "../Form/FormComponents";
import { Captcha } from "components/Captcha";
import { useFormDataState } from "util/useFormDataState";
import { useErrorModal } from "components/SimpleModal/useErrorModal";
import { useSuccessModal } from "components/SimpleModal/useSuccessModal";
import { useMutation } from "@tanstack/react-query";

export function VolunteeringForm() {
  const [formData, setFormData] = useFormDataState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    about: "",
    captchaToken: null,
  });

  const [successModal, showSuccessModal] = useSuccessModal();
  const [errorModal, showErrorModal] = useErrorModal();

  const submit = useMutation({
    mutationFn: () => submitVolunteeringForm(formData),
    onError: showErrorModal,
    onSuccess: showSuccessModal,
  });

  return (
    <>
      <Form handleSubmit={submit.mutate}>
        {(triedSubmitCounter: number) => (
          <>
            <div className="form-grid-2">
              <FullName
                value={formData.fullName}
                setValue={setFormData("fullName")}
                triedSubmitCounter={triedSubmitCounter}
              />
              <Tel
                value={formData.phoneNumber}
                setValue={setFormData("phoneNumber")}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <div className="form-grid-2">
              <Email
                value={formData.email}
                setValue={setFormData("email")}
                triedSubmitCounter={triedSubmitCounter}
              />
              <BirthDate
                value={formData.birthDate}
                setValue={setFormData("birthDate")}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <About
              value={formData.about}
              setValue={setFormData("about")}
              triedSubmitCounter={triedSubmitCounter}
            />
            <div className="form-grid-3">
              <Captcha onCaptcha={setFormData("captchaToken")} />
              <button
                className="form--button"
                disabled={!formData.captchaToken}
              >
                Wyślij
              </button>
            </div>
          </>
        )}
      </Form>
      {successModal}
      {errorModal}
    </>
  );
}
