<script lang="ts">
  import { logout } from '../contexts/auth.context';
import { notifyError } from '../contexts/notification.context';
  import { ChangePasswordParams, authService } from '../services/AuthService';
  import Modal from './Modal.svelte';
  import PasswordInput from './PasswordInput.svelte';

  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;
  let formData = new ChangePasswordParams();

  $: if (modalVisible) formData = new ChangePasswordParams();

  async function changePassword() {
    try {
      await authService.changeSelfPassword(formData);
      logout();
    } catch (e) {
      notifyError({ message: 'Nie udało się zmienić hasła: ' + e.message });
    }
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
    <PasswordInput
      label="Obecne hasło"
      bind:password={formData.currentPassword}
    />
    <PasswordInput label="Nowe hasło" bind:password={formData.newPassword} />
    <PasswordInput
      label="Potwierdź nowe hasło"
      bind:password={formData.newPasswordAgain}
      message={formData.isValid ? '' : 'Hasła muszą się zgadzać.'}
    />
    <em>Po zmianie hasła nastąpi wylogowanie.</em>
  </form>
</Modal>
