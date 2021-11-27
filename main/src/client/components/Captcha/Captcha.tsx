import { fetchCaptcha, FetchError } from 'api';
import { useEffect, useState } from 'react';

export type FormCaptcha = {
  id: string;
  uri: string;
};

export function Captcha({ onGenerate }) {
  const [captcha, setCaptcha] = useState<FormCaptcha>(null);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(true);

  console.log(error, loading);

  const loadCaptcha = async () => {
    setLoading(true);

    const { data, error } = await fetchCaptcha();
    setCaptcha(data);
    setError(error);
    if (data) {
      onGenerate(data.id);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  return captcha && <img src={captcha.uri} alt="captcha" />;
}
