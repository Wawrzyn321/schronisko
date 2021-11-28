import { fetchCaptcha, FetchError } from 'api/api';
import { useEffect, useState } from 'react';

export type ReceivedCaptcha = {
  id: string;
  uri: string;
};

export function Captcha({ onGenerate }: { onGenerate: (id: string) => any }) {
  const [captcha, setCaptcha] = useState<ReceivedCaptcha>(null);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(true);

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
