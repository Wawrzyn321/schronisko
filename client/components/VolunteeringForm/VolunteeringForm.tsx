import { fetchVolunteeringForm } from "api/api";
import { useSimpleModal } from "components/SimpleModal/useModal";
import { useState } from "react";
import { Form } from "../Form/Form";
import { Email, FullName, Tel, BirthDate, About } from "../Form/FormComponents";
import ilu_pies from "public/site/ilu pies.png";
import ilu_kot from "public/site/ilu kot.png";
import { Captcha } from "components/Captcha";
import { useFormDataState } from "util/useFormDataState";

export function VolunteeringForm() {
  const [formData, setFormData] = useFormDataState({
    fullName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    about: ''
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [successModal, showSuccessModal] = useSimpleModal({
    title: "Udało się!",
    image: ilu_pies,
    text: (
      <>
        Gratulujemy.
        <br />
        Pies cieszy się razem z Tobą.
      </>
    ),
  });
  const [errorModal, showErrorModal] = useSimpleModal({
    title: "Upsss...",
    image: ilu_kot,
    text: (
      <>
        Coś poszło nie tak.
        <br />
        Spróbuj ponownie.
      </>
    ),
  });

  const sendForm = async () => {
    try {
      await fetchVolunteeringForm({
        ...formData,
        captchaToken,
      });
      showSuccessModal();
    } catch (e) {
      console.warn(e);
      showErrorModal();
    }
  };

  return (
    <>
      <Form handleSubmit={sendForm}>
        {(triedSubmitCounter: number) => (
          <>
            <div className="form-grid-2">
              <FullName
                value={formData.fullName}
                setValue={setFormData('fullName')}
                triedSubmitCounter={triedSubmitCounter}
              />
              <Tel
                value={formData.phoneNumber}
                setValue={setFormData('phoneNumber')}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <div className="form-grid-2">
              <Email
                value={formData.email}
                setValue={setFormData('email')}
                triedSubmitCounter={triedSubmitCounter}
              />
              <BirthDate
                value={formData.birthDate}
                setValue={setFormData('birthDate')}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <About
              value={formData.about}
              setValue={setFormData('about')}
              triedSubmitCounter={triedSubmitCounter}
            />
            <div className="form-grid-3">
              <Captcha onCaptcha={setCaptchaToken} />
              <button className="form--button" disabled={!captchaToken}>
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
