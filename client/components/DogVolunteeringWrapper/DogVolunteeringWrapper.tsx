import { Settings } from '@prisma-app/client';
import { Article } from 'components/Article/Article';
import { VolunteeringForm } from 'components/VolunteeringForm/VolunteeringForm';
import { ERROR_VOLUNTEERING_FORM } from 'errors';
import React from 'react';
import { useLoadSettings } from './useLoadSettings';

export function DogVolunteeringWrapper({
  ssrSettings,
}: {
  ssrSettings: Settings[];
}) {
  const { settings, error } = useLoadSettings(ssrSettings);

  if (error) {
    return <Article {...ERROR_VOLUNTEERING_FORM} />;
  }

  const areDogVolunteeringEnabled =
    settings?.find((s) => s.id === 'DOG_VOLUNTEERING_ENABLED')?.value ===
    'true';

  return areDogVolunteeringEnabled && <VolunteeringForm />;
}
