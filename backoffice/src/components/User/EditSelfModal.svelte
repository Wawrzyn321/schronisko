<script lang="ts">
  import Field from './../shared/Field.svelte';
  import Modal from '../shared/Modal.svelte';
  import { Input } from 'svelma';
  import type { UserViewModel } from '../../common/UserViewModel';
  import { auth } from '../../contexts/auth.context';
  import { userService } from './../../services/UserService';
  import {
    notifyError,
    notifySuccess,
  } from '../../contexts/notification.context';

  export let onSelfEdited: (u: UserViewModel, notify?: boolean) => void = undefined;
  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;
  let loading = false;

  let user: UserViewModel;

  $: if (modalVisible) {
    if (!user) user = { ...$auth.user };
  }

  async function updateSelf() {
    try {
      loading = true;
      const updatedUser = await userService.updateSelf(user);
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
      <Input required bind:value={user.login} placeholder="Login" />
    </Field>
    <Field label="Imię" required>
      <Input required bind:value={user.firstName} placeholder="Imię" />
    </Field>
    <Field label="Nazwisko" required>
      <Input required bind:value={user.lastName} placeholder="Nazwisko" />
    </Field>
  </form>
</Modal>
