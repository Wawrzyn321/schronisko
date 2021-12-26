import { fetchVolunteeringForm } from 'api/api';
import { useCaptcha } from 'components/Captcha/useCapcha';
import { useState } from 'react';
import { Form } from '../Form/Form';
import { Email, FullName, Tel, BirthDate, About } from '../Form/FormComponents';

export function VolunteeringForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [about, setAbout] = useState('');

  const { refetchCaptcha, captchaElement, captchaInput, captchaValue } =
    useCaptcha();

  const sendForm = async () => {
    try {
      await fetchVolunteeringForm(captchaValue, {
        fullName,
        email,
        telNumber,
        birthDate,
        about,
      });
      //todo
      alert('Udało się, jeszcze jakoś uładnimy tą wiadomość.');
    } catch (e) {
      if (e.statusCode === 400) {
        alert('Nieprawidłowa captcha! Spróbuj ponownie.');
        refetchCaptcha();
      } else {
        console.warn(e);
        alert(
          'Ups... coś poszło nie tak. Jeśli sytuacja będzie się powtarzać, wyślij aplikację bezpośrednio pod adres Wawrzyn321@gmail.com.',
        );
      }
    }
  };

  return (
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
            {captchaElement}
            {captchaInput(triedSubmitCounter)}
            <button className="form--button">Wyślij</button>
          </div>
        </>
      )}
    </Form>
  );
}
