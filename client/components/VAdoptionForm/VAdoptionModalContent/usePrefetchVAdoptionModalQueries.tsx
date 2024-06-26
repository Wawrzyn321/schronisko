import { Page as PageModel, Settings } from '@prisma-app/client';
import { FetchError, fetchPage, fetchSettings } from 'api/api';
import { useEffect, useState } from 'react';
import { AdoptionModalProps } from './VAdoptionModalContent';

export function usePrefetchVAdoptionModalQueries(): AdoptionModalProps {
  const [data, setData] = useState<{ page: PageModel; accountNo: string }>();
  const [error, setError] = useState<FetchError>();

  useEffect(() => {
    const loadData = async () => {
      const { data: page, error: pageError } = await fetchPage(
        'modal-adopcji-wirtualnej',
      );
      const { data: settings, error: settingsError } = await fetchSettings();

      const accountNoSetting: Settings | undefined = settings?.find(
        (s) => s.id === 'V_ADOPTION_ACCOUNT_NUMBER',
      );

      setData({
        page,
        accountNo: accountNoSetting?.value || 'Nie podano numeru konta!',
      });
      setError(pageError || settingsError);
    };

    loadData();
  }, []);

  return { data, error };
}
