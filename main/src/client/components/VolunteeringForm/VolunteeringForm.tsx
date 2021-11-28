import { fetchVolunteeringForm } from 'api/api';
import { useCaptcha } from 'components/Captcha/useCapcha';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { useState } from 'react';
import { FormCaptcha } from 'types';
import { Form } from '../Form/Form';
import { Email, FullName, Tel, BirthDate, About } from '../Form/FormComponents';

export function VolunteeringForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [about, setAbout] = useState('');
  const [captcha, setCaptcha] = useState<FormCaptcha>({ id: '', text: '' });

  const [refetchCaptcha, captchaElement] = useCaptcha((id) =>
    setCaptcha({ ...captcha, id }),
  );

  const sendForm = async () => {
    try {
      await fetchVolunteeringForm(captcha, {
        fullName,
        email,
        telNumber,
        birthDate,
        about,
      });
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
    <LayoutWrapper>
      <Form handleSubmit={sendForm}>
        {(valid: boolean) => (
          <>
            <div className="form-grid-2">
              <FullName value={fullName} setValue={setFullName} />
              <Tel value={telNumber} setValue={setTelNumber} />
            </div>
            <div className="form-grid-2">
              <Email value={email} setValue={setEmail} />
              <BirthDate value={birthDate} setValue={setBirthDate} />
            </div>
            <About value={about} setValue={setAbout} />
            <div className="form-grid-3">
              {captchaElement}
              <label>
                Wpisz captchę:
                <input
                  required
                  value={captcha.text}
                  onChange={(e) =>
                    setCaptcha({ ...captcha, text: e.target.value })
                  }
                />
              </label>
              <button className="form--button" disabled={!valid}>
                Wyślij
              </button>
            </div>
          </>
        )}
      </Form>
    </LayoutWrapper>
  );
}
