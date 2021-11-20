import { Animal } from '.prisma/client';
import { Modal } from 'components/Modal';
import { useRef, useState } from 'react';
import {
  VAdoptionModalContent,
} from './VAdoptionModalContent/VAdoptionModalContent';
import { usePrefetchVAdoptionModalQueries } from "./VAdoptionModalContent/usePrefetchVAdoptionModalQueries";
import {
  FullName,
  Email,
  VCaretaker,
  AdditionalMessage,
} from './FormComponents';
import styles from './VAdoptionForm.module.scss';

export function VAdoptionForm({ animal }: { animal: Animal }) {
  const adoptionModalProps = usePrefetchVAdoptionModalQueries();

  const [fullName, setFullName] = useState('');
  const [vCaretakerName, setVCaretakerName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [showAdoptionModal, setShowAdoptionModal] = useState(false);

  const formRef = useRef(null);
  const [valid, setValid] = useState(false);

  const onChange = () => setValid(formRef.current.checkValidity());

  const onSubmit = (e: { preventDefault: () => any }) => {
    e.preventDefault();
    setShowAdoptionModal(true);
  };

  return (
    <>
      <form
        className={styles['v-adoption-form--form']}
        ref={formRef}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <div className={styles['v-adoption-form--grid-2']}>
          <label>
            Imię
            <input readOnly defaultValue={animal.name} />
          </label>
          <label>
            Numer ewidencyjny
            <input readOnly defaultValue={animal.refNo} />
          </label>
        </div>
        <div className={styles['v-adoption-form--grid-2']}>
          <FullName value={fullName} setValue={setFullName} />
          <Email value={email} setValue={setEmail} />
        </div>
        <VCaretaker value={vCaretakerName} setValue={setVCaretakerName} />
        <AdditionalMessage
          value={additionalMessage}
          setValue={setAdditionalMessage}
        />
        <button className={styles['v-adoption-form--button']} disabled={!valid}>
          Zatwierdź
        </button>
      </form>
      <Modal
        isOpen={showAdoptionModal}
        onRequestClose={() => setShowAdoptionModal(false)}
      >
        <VAdoptionModalContent {...adoptionModalProps} />
      </Modal>
    </>
  );
}
