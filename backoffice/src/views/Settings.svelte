<script lang="ts">
  import { onMount } from 'svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import { settingsService } from '../services/SettingsService';

  const DOG_VOLUNTEERING_SETTING = 'DOG_VOLUNTEERING_ENABLED';

  let dogVolunteeringOpen = false;
  let loading = true;
  let isSaving = false;

  onMount(async () => {
    try {
      const settings = await settingsService.get();

      const dogVolunteeringSetting = settings.find(
        (s) => s.id === DOG_VOLUNTEERING_SETTING
      );
      if (dogVolunteeringSetting) {
        dogVolunteeringOpen = dogVolunteeringSetting.value === 'true';
      } else {
        dogVolunteeringOpen = false;
      }

      loading = false;
    } catch (e) {
      notifyError({ message: 'Nie można pobrać ustawień: ' + e.message });
    }
  });
</script>

<main>
  <header>
    <h1>Dodatkowe ustawienia</h1>
  </header>
  <section>
    {#if !loading}
      <label>
        <input
          disabled={isSaving}
          checked={dogVolunteeringOpen}
          type="checkbox"
          on:change={async () => {
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
          }}
        />
        Psi wolontariat możliwy
      </label>
    {/if}
    {#if loading}
      Ładowanie ustawień...
    {/if}
  </section>
</main>

<style lang="scss">
  main {
    margin: 24px;
  }

  header {
    margin-bottom: 32px;
  }
</style>
