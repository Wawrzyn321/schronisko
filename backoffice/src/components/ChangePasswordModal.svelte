<script lang="ts">
  import { Field, Input } from 'svelma';
  import { logout } from '../auth.context';
  import { ChangePasswordParams, loginService } from '../services/LoginService';
  import Modal from './Modal.svelte';

  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;
  let formData = new ChangePasswordParams();

  $: if (modalVisible) formData = new ChangePasswordParams();

  async function changePassword() {
    await loginService.changePassword(formData);
    logout();
  }

  function onInput() {
    isFormValid = form.checkValidity() && formData.isValid;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Zmień hasło"
  confirmText="Potwierdź"
  onConfirm={changePassword}
  disabledConfirm={!isFormValid}
>
  <form bind:this={form} on:input={onInput}>
    <Field label="Obecne hasło">
      <Input
        required
        type="password"
        bind:value={formData.currentPassword}
        placeholder="Obecne hasło"
      />
    </Field>
    <Field label="Nowe hasło">
      <Input
        required
        type="password"
        bind:value={formData.newPassword}
        placeholder="Nowe hasło"
      />
    </Field>
    <Field label="Potwierdź nowe hasło">
      <Input
        required
        type="password"
        bind:value={formData.newPasswordAgain}
        placeholder="Potwierdź nowe"
      />
    </Field>
    {#if !formData.isValid}
      Hasła muszą się zgadzać.
    {/if}
  </form>
</Modal>
