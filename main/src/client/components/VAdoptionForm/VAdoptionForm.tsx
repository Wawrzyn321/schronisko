import { Animal } from '.prisma/client';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import { VAdoptionModalContent } from './VAdoptionModalContent/VAdoptionModalContent';
import { usePrefetchVAdoptionModalQueries } from './VAdoptionModalContent/usePrefetchVAdoptionModalQueries';
import {
  FullName,
  Email,
  VCaretaker,
  AdditionalMessage,
} from '../Form/FormComponents';
import { Form } from '../Form/Form';
import { Captcha } from 'components/Captcha/Captcha';
import { FormCaptcha } from 'types';
import { fetchVAdoptionForm } from 'api/api';

export function VAdoptionForm({ animal }: { animal: Animal }) {
  const adoptionModalProps = usePrefetchVAdoptionModalQueries();

  const [fullName, setFullName] = useState('');
  const [vCaretakerName, setVCaretakerName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [captcha, setCaptcha] = useState<FormCaptcha>(null);

  const [showAdoptionModal, setShowAdoptionModal] = useState(false);

  const onSubmit = async () => {
    try {
      await fetchVAdoptionForm(captcha, {
        fullName,
        vCaretakerName,
        email,
        additionalMessage,
        animalId: animal.id,
        animalName: animal.name,
        animalRefNo: animal.refNo,
      });
      setShowAdoptionModal(true);
    } catch (e) {
      console.log(e);
      // todo alert tu i w VolunteeringForm
    }
  };

  return (
    <>
      <Form handleSubmit={onSubmit}>
        {(valid: boolean) => (
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
              <FullName value={fullName} setValue={setFullName} />
              <Email value={email} setValue={setEmail} />
            </div>
            <VCaretaker value={vCaretakerName} setValue={setVCaretakerName} />
            <AdditionalMessage
              value={additionalMessage}
              setValue={setAdditionalMessage}
            />{' '}
            <div className="form-grid-3">
              <Captcha onGenerate={(id) => setCaptcha({ ...captcha, id })} />
              <label>
                Wpisz captchę:
                <input
                  required
                  value={captcha?.text}
                  onChange={(e) =>
                    setCaptcha({ ...captcha, text: e.target.value })
                  }
                />
              </label>
              <button className="form--button" disabled={!valid}>
                Zatwierdź
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
    </>
  );
}
