<script lang="ts">
  import type { Settings } from '.prisma/client';

  import { onMount } from 'svelte';
  import DogVolunteering from '../components/Settings/DogVolunteering.svelte';
  import NumberInput from '../components/Settings/NumberInput.svelte';
  import { notifyError } from '../contexts/notification.context';
  import { settingsService } from '../services/SettingsService';

  let loading = true;
  let isSaving = false;
  let settings: Settings[];

  onMount(async () => {
    try {
      settings = await settingsService.get();
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
      <DogVolunteering bind:isSaving bind:settings />
      <NumberInput
        name="Numer KRS"
        bind:isSaving
        bind:settings
        settingsKey="KRS_NUMBER"
      />
      <NumberInput
        name="Numer konta wirtualnych adopcji"
        bind:isSaving
        bind:settings
        settingsKey="V_ADOPTION_ACCOUNT_NUMBER"
      />
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
