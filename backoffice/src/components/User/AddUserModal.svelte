<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input } from 'svelma';
  import { createDefaultUser } from './UserCreateParams';
  import type { UserCreateParams } from './UserCreateParams';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import PermissionsForm from './PermissionsForm.svelte';
  import { userService } from '../../services/UserService';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onUserAdded: (user: UserViewModel) => any;

  let form: HTMLFormElement;
  let isFormValid = false;

  let user: UserCreateParams;

  $: if (modalVisible) user = createDefaultUser();

  async function addUser() {
    try {
      const newUser = await userService.addUser(user);
      onUserAdded(newUser);
    } catch (e) {
      notifyError({ message: 'Nie można dodać użytkownika: ' + e.message });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Dodaj użytkownika"
  confirmText="Dodaj"
  onConfirm={addUser}
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
    <Field
      label="Hasło"
      message="Przekaż hasło użytkownikowi po jego stworzeniu."
    >
      <Input required bind:value={user.password} placeholder="Hasło" />
    </Field>
    <PermissionsForm
      permissions={user.permissions}
      updatePermissions={(p) => (user.permissions = p)}
    />
  </form>
</Modal>
