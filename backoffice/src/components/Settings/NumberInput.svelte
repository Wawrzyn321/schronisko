<script lang="ts">
  import { Button, Input } from 'svelma';
  import type { Settings } from '.prisma/client';
  import {
    notifyError,
    notifySuccess,
  } from '../../contexts/notification.context';
  import { settingsService } from '../../services/SettingsService';
  import Field from '../shared/Field.svelte';

  export let name: string;
  export let isSaving: boolean;
  export let settings: Settings[];
  export let settingsKey: string;

  const currentSetting = settings.find((s) => s.id === settingsKey);

  let settingValue = currentSetting?.value || '';

  let newValue = settingValue;

  async function save() {
    isSaving = true;
    try {
      await settingsService.upsert(settingsKey, newValue);
      notifySuccess({ message: 'Zapisano ustawienie.' });
      settingValue = newValue;
    } catch (e) {
      notifyError({
        message: 'Nie można zapisać ustawienia: ' + e.message,
      });
    } finally {
      isSaving = false;
    }
  }
</script>

<div class="number-input">
  <Field label={name}>
    <Input bind:value={newValue} />
    <p class="control">
      <Button
        type="is-primary"
        disabled={isSaving || !newValue || newValue === settingValue}
        on:click={save}
      >
        Zapisz
      </Button>
    </p>
  </Field>
</div>

<style lang="scss">
  .number-input {
    max-width: 700px;
    margin-top: 32px;

    :global(label) {
      margin-right: 16px;
      width: 270px;
    }

    :global(input) {
      width: 340px;
    }
  }
</style>
