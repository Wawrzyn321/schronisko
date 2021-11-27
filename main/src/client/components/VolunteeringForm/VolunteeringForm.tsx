import { fetchVolunteeringForm } from 'api';
import { Captcha } from 'components/Captcha/Captcha';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { useState } from 'react';
import { Form } from '../Form/Form';
import { Email, FullName, Tel, BirthDate, About } from '../Form/FormComponents';

export function VolunteeringForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [about, setAbout] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaId, setCaptchaId] = useState('');

  const sendForm = async () => {
    try {
      await fetchVolunteeringForm(
        { id: captchaId, text: captcha },
        {
          fullName,
          email,
          telNumber,
          birthDate,
          about,
        },
      );
    } catch (e) {
      console.log(e);
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
              <Captcha onGenerate={setCaptchaId} />
              <label>
                Wpisz captchę:
                <input
                  required
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
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
{
  /* data urodzenia
nr tel
kilka słów o sobie  */
}
