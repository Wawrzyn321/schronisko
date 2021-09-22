<script lang="ts">
  import { onMount } from 'svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import { settingsService } from '../services/SettingsService';

  const DOG_ADOPTION_SETTING = 'DOG_ADOPTION_ENABLED';

  let dogAdoptionsOpen = false;
  let loading = true;
  let isSaving = false;

  onMount(async () => {
    try {
      const settings = await settingsService.get();

      const dogAdoptionsSetting = settings.find(
        (s) => s.id === DOG_ADOPTION_SETTING
      );
      if (dogAdoptionsSetting) {
        dogAdoptionsOpen = dogAdoptionsSetting.value === 'true';
      } else {
        dogAdoptionsOpen = false;
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
          checked={dogAdoptionsOpen}
          type="checkbox"
          on:change={async () => {
            isSaving = true;
            try {
              await settingsService.upsert(
                DOG_ADOPTION_SETTING,
                (!dogAdoptionsOpen).toString()
              );
              dogAdoptionsOpen = !dogAdoptionsOpen;
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
        Adopcje psów możliwe
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
