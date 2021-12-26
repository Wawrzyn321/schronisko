import Image from 'next/image';
import { fetchCaptcha, FetchError } from 'api/api';
import React, { useEffect, useState } from 'react';
import styles from './useCapcha.module.scss';
import { FormCaptcha } from 'types';
import reload from 'public/site/reload.svg';

const CAPTCHA_LENGTH = 6;

export type ReceivedCaptcha = {
  id: string;
  uri: string;
};

export function useCaptcha(): {
  refetchCaptcha: () => Promise<any>;
  captchaElement: JSX.Element;
  captchaInput: (e: number) => JSX.Element;
  captchaValue: FormCaptcha;
} {
  const [receivedCaptcha, setReceivedCaptcha] = useState<ReceivedCaptcha>(null);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(true);
  const [typedCaptcha, setTypedCaptcha] = useState('');

  const loadCaptcha = async () => {
    setLoading(true);
    setTypedCaptcha('');
    setReceivedCaptcha(null);

    const { data, error } = await fetchCaptcha();
    setReceivedCaptcha(data);
    setError(error);
    setLoading(false);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const captchaElement = (
    <label>
      Obrazek zawiera {CAPTCHA_LENGTH} liter
      {loading && <p className={styles['captcha-info']}>Ładowanie...</p>}
      {error && (
        <p className={styles['captcha-info']}>Wystąpił błąd ładowania</p>
      )}
      {receivedCaptcha && (
        <img
          src={receivedCaptcha.uri}
          className={styles['captcha-image']}
          alt="captcha"
        />
      )}
      <button
        type="button"
        onClick={loadCaptcha}
        className={styles['reload-button']}
      >
        <div className={styles['reload-button--icon']}>
          <Image src={reload} alt="" width="14" height="14" />
        </div>
        Załaduj ponownie
      </button>
    </label>
  );

  const captchaInput = (triedSubmitCounter: number) => (
    <label>
      Przepisz litery z obrazka obok
      <input
        required
        value={typedCaptcha}
        onChange={(e) => setTypedCaptcha(e.target.value)}
        maxLength={CAPTCHA_LENGTH}
      />
      <p className="validation-message">
        {triedSubmitCounter > 0 && !typedCaptcha && 'Uzupełnij captchę'}
      </p>
    </label>
  );

  return {
    refetchCaptcha: loadCaptcha,
    captchaElement,
    captchaInput,
    captchaValue: receivedCaptcha
      ? { id: receivedCaptcha.id, text: typedCaptcha }
      : null,
  };
}
