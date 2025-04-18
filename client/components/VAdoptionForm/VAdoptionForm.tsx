import { Animal } from '@prisma-app/client';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import { VAdoptionModalContent } from './VAdoptionModalContent/VAdoptionModalContent';
import { usePrefetchVAdoptionModalQueries } from './VAdoptionModalContent/usePrefetchVAdoptionModalQueries';
import {
  FullName,
  Email,
  VCaretakerName,
  AdditionalMessage,
} from '../Form/FormComponents';
import { Form } from '../Form/Form';
import { fetchVAdoptionForm } from 'api/api';
import { useSimpleModal } from '../SimpleModal/useModal';
import ilu_kot from 'public/site/ilu kot.png';
import { Captcha } from 'components/common/Captcha';

export function VAdoptionForm({ animal }: { animal: Animal }) {
  const adoptionModalProps = usePrefetchVAdoptionModalQueries();

  const [fullName, setFullName] = useState('');
  const [vCaretakerName, setVCaretakerName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
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

  const onSubmit = async () => {
    try {
      await fetchVAdoptionForm({
        fullName,
        vCaretakerName,
        email,
        additionalMessage,
        animalId: animal.id,
        animalName: animal.name,
        animalRefNo: animal.refNo,
        captchaToken,
      });
      setShowAdoptionModal(true);
    } catch (e) {
      console.warn(e);
      showErrorModal();
    }
  };

  return (
    <>
      <Form handleSubmit={onSubmit}>
        {(triedSubmitCounter: number) => (
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
              <FullName
                value={fullName}
                setValue={setFullName}
                triedSubmitCounter={triedSubmitCounter}
              />
              <Email
                value={email}
                setValue={setEmail}
                triedSubmitCounter={triedSubmitCounter}
              />
            </div>
            <VCaretakerName
              value={vCaretakerName}
              setValue={setVCaretakerName}
              triedSubmitCounter={triedSubmitCounter}
            />
            <AdditionalMessage
              value={additionalMessage}
              setValue={setAdditionalMessage}
            />
            <div className="form-grid-3">
              <Captcha onCaptcha={setCaptchaToken} />
              <button disabled={!captchaToken} className="form--button">Wyślij</button>
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
      {errorModal}
    </>
  );
}
