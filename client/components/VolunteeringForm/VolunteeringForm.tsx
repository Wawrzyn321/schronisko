import { fetchVolunteeringForm } from 'api/api';
import {
  useSimpleModal,
} from 'components/SimpleModal/useModal';
import { useState } from 'react';
import { Form } from '../Form/Form';
import { Email, FullName, Tel, BirthDate, About } from '../Form/FormComponents';
import ilu_pies from 'public/site/ilu pies.png';
import ilu_kot from 'public/site/ilu kot.png';
import { Captcha } from 'components/common/Captcha';

export function VolunteeringForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [about, setAbout] = useState('');

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [successModal, showSuccessModal] = useSimpleModal({
    title: 'Udało się!',
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
    title: 'Upsss...',
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
        fullName,
        email,
        telNumber,
        birthDate,
        about,
        captchaToken
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
                value={fullName}
                setValue={setFullName}
                triedSubmitCounter={triedSubmitCounter}
              />
              <Tel
                value={telNumber}
                setValue={setTelNumber}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <div className="form-grid-2">
              <Email
                value={email}
                setValue={setEmail}
                triedSubmitCounter={triedSubmitCounter}
              />
              <BirthDate
                value={birthDate}
                setValue={setBirthDate}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <About
              value={about}
              setValue={setAbout}
              triedSubmitCounter={triedSubmitCounter}
            />
            <div className="form-grid-3">
              <Captcha onCaptcha={setCaptchaToken} />
              <button className="form--button" disabled={!captchaToken}>Wyślij</button>
            </div>
          </>
        )}
      </Form>
      {successModal}
      {errorModal}
    </>
  );
}
