<script lang="ts">
  import { Tooltip } from 'svelma';
  import { logout } from '../../contexts/auth.context';
  import { notifyError } from '../../contexts/notification.context';
  import {
    ChangePasswordParams,
    authService,
  } from '../../services/AuthService';
  import Modal from '../shared/Modal.svelte';
  import PasswordInput from './PasswordInput.svelte';

  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;
  let loading = false;
  let formData = new ChangePasswordParams();

  $: if (modalVisible) formData = new ChangePasswordParams();

  async function changePassword() {
    try {
      loading = true;
      await authService.changeSelfPassword(formData);
      logout({ type: 'is-info', message: 'Hasło zostało zmienione.' });
    } catch (e) {
      notifyError({ message: 'Nie udało się zmienić hasła: ' + e.message });
    }
    loading = false;
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
  disabledConfirm={!isFormValid || loading}
  loadingConfirm={loading}
>
  <form bind:this={form} on:input={onInput}>
    <PasswordInput
      label="Obecne hasło"
      bind:password={formData.currentPassword}
      autocomplete="current-password"
    />
    <div class="tooltip-wrapper-wrapper">
      <Tooltip
        multilined={true}
        style="width: 420px"
        label="Nie ma wymagań co do siły hasła. Używanie słabego hasła to wybór."
      >
        <PasswordInput
          label="Nowe hasło"
          bind:password={formData.newPassword}
          autocomplete="new-password"
        />
      </Tooltip>
    </div>
    <PasswordInput
      label="Potwierdź nowe hasło"
      bind:password={formData.newPasswordAgain}
      message={formData.isValid ? '' : 'Hasła muszą się zgadzać.'}
      autocomplete="new-password"
    />
    <em>Po zmianie hasła nastąpi wylogowanie.</em>
  </form>
</Modal>

<style lang="scss">
  .tooltip-wrapper-wrapper {
    :global(.tooltip-wrapper) {
      display: block;
      margin-bottom: 12px;
    }
  }
</style>
