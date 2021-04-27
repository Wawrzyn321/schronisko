<script lang="ts">
  import { Field, Input } from 'svelma';
  import { ChangePasswordParams, loginService } from '../services/LoginService';
  import Modal from './Modal.svelte';

  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;
  let formData = new ChangePasswordParams();

  const onMounted = (visible: boolean) => {
    if (visible) {
      formData = new ChangePasswordParams();
    }
  };

  $: onMounted(modalVisible);

  async function changePassword() {
    await loginService.changePassword(formData);
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
