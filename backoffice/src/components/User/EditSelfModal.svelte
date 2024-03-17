<script lang="ts">
  import Field from './../shared/Field.svelte';
  import Modal from '../shared/Modal.svelte';
  import { Input } from 'svelma';
  import type { UserData, UserViewModel } from '../../common/UserViewModel';
  import { auth } from '../../contexts/auth.context';
  import { userService } from './../../services/UserService';
  import {
    notifyError,
    notifySuccess,
  } from '../../contexts/notification.context';

  export let onSelfEdited: (u: UserViewModel, notify?: boolean) => void =
    undefined;
  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;
  let loading = false;

  let userUpdateData: UserData;

  $: if (modalVisible) {
    if (!userUpdateData)
      userUpdateData = {
        firstName: $auth.user.firstName,
        lastName: $auth.user.lastName,
        login: $auth.user.login,
      };
  }

  async function updateSelf() {
    try {
      loading = true;
      const updatedUser = await userService.updateSelf($auth.user, userUpdateData);
      onSelfEdited && onSelfEdited(updatedUser, false);
      notifySuccess({ message: 'Twoje dane zostały zapisane.' });
    } catch (e) {
      notifyError({ message: 'Błąd zapisywania danych: ' + e.message });
    }
    loading = false;
  }

</script>

<Modal
  bind:isOpen={modalVisible}
  title="Twoje dane"
  confirmText="Zatwierdź"
  onConfirm={updateSelf}
  disabledConfirm={!isFormValid || loading}
  loadingConfirm={loading}
>
  <form bind:this={form} on:input={() => (isFormValid = form.checkValidity())}>
    <Field label="Login" required>
      <Input
        required
        bind:value={userUpdateData.login}
        placeholder="Login"
        pattern=".*\S+.*"
      />
    </Field>
    <Field label="Imię" required>
      <Input
        required
        bind:value={userUpdateData.firstName}
        placeholder="Imię"
        pattern=".*\S+.*"
      />
    </Field>
    <Field label="Nazwisko" required>
      <Input
        required
        bind:value={userUpdateData.lastName}
        placeholder="Nazwisko"
        pattern=".*\S+.*"
      />
    </Field>
  </form>
</Modal>
