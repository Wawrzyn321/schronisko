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

export function VAdoptionForm({ animal }: { animal: Animal }) {
  const adoptionModalProps = usePrefetchVAdoptionModalQueries();

  const [fullName, setFullName] = useState('');
  const [vCaretakerName, setVCaretakerName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [showAdoptionModal, setShowAdoptionModal] = useState(false);

  return (
    <>
      <Form handleSubmit={() => setShowAdoptionModal(true)}>
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
            />
            <button className="form--button" disabled={!valid}>
              Zatwierdź
            </button>
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
