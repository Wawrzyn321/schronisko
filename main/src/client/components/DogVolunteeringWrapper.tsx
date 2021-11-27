import { Settings } from '.prisma/client';
import { FetchError, fetchSettings } from 'api';
import { Article } from 'components/Article/Article';
import { VolunteeringForm } from 'components/VolunteeringForm/VolunteeringForm';
import { ERROR_VOLUNTEERING_FORM } from 'errors';
import React, { useEffect, useState } from 'react';

export function DogVolunteeringWrapper({
  ssrSettings,
}: {
  ssrSettings: Settings[];
}) {
  const [settings, setSettings] = useState<Settings[]>(ssrSettings);
  const [error, setError] = useState<FetchError>();

  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await fetchSettings();
      setSettings(data);
      setError(error);
    };

    loadSettings();
  }, []);

  if (error) {
    return <Article {...ERROR_VOLUNTEERING_FORM} />;
  }

  const areDogVolunteeringEnabled =
    settings?.find((s) => s.id === 'DOG_VOLUNTEERING_ENABLED')?.value ===
    'true';
  return areDogVolunteeringEnabled && <VolunteeringForm />;
}
