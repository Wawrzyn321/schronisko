<script lang="ts">
  import type { Settings } from '@prisma-app/client';
  import {
    notifyError,
    notifySuccess,
  } from '../../contexts/notification.context';
  import { settingsService } from '../../services/SettingsService';

  export let isSaving: boolean;
  export let settings: Settings[];

  const DOG_VOLUNTEERING_SETTING = 'DOG_VOLUNTEERING_ENABLED';

  const dogVolunteeringSetting = settings.find(
    (s) => s.id === DOG_VOLUNTEERING_SETTING
  );

  let dogVolunteeringOpen = dogVolunteeringSetting?.value === 'true';

  async function save() {
    isSaving = true;
    try {
      await settingsService.upsert(
        DOG_VOLUNTEERING_SETTING,
        (!dogVolunteeringOpen).toString()
      );
      dogVolunteeringOpen = !dogVolunteeringOpen;
      notifySuccess({ message: 'Zapisano ustawienie.' });
    } catch (e) {
      notifyError({
        message: 'Nie można zapisać ustawienia: ' + e.message,
      });
    } finally {
      isSaving = false;
    }
  }
</script>

<label>
  <input
    disabled={isSaving}
    checked={dogVolunteeringOpen}
    type="checkbox"
    on:change={save}
  />
  Psi wolontariat możliwy
</label>
