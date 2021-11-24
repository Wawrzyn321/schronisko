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

  return (
    <LayoutWrapper>
      <Form handleSubmit={() => console.log('dupa')}>
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
            <button className="form--button" disabled={!valid}>
              Zatwierdź
            </button>
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
