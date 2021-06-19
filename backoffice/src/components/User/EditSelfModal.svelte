<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input } from 'svelma';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { auth } from '../../contexts/auth.context';
  import { userService } from './../../services/UserService';
import { notifyError, notifySuccess } from '../../contexts/notification.context';

  export let onSelfEdited: (u: UserViewModel) => void = undefined;
  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;

  let user: UserViewModel;

  $: if (modalVisible) {
    if (!user) user = { ...$auth.user };
  }

  async function updateSelf() {
    try {
      const updatedUser = await userService.updateSelf(user);
      onSelfEdited && onSelfEdited(updatedUser);
      notifySuccess({ message: 'Twoje dane zostały zapisane' });
    } catch (e) {
      notifyError({ message: 'Błąd zapisywania danych: ' + e.message });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Twoje dane"
  confirmText="Zatwierdź"
  onConfirm={updateSelf}
  disabledConfirm={!isFormValid}
>
  <form bind:this={form} on:input={() => (isFormValid = form.checkValidity())}>
    <Field label="Login">
      <Input required bind:value={user.login} placeholder="Login" />
    </Field>
    <Field label="Imię">
      <Input required bind:value={user.firstName} placeholder="Imię" />
    </Field>
    <Field label="Nazwisko">
      <Input required bind:value={user.lastName} placeholder="Nazwisko" />
    </Field>
  </form>
</Modal>
