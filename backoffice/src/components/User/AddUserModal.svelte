<script lang="ts">
  import Field from './../shared/Field.svelte';
  import Modal from '../shared/Modal.svelte';
  import { Input } from 'svelma';
  import { createDefaultUser } from './UserCreateParams';
  import type { UserCreateParams } from './UserCreateParams';
  import type { UserViewModel } from '../../common/UserViewModel';
  import PermissionsForm from './PermissionsForm.svelte';
  import { userService } from '../../services/UserService';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onUserAdded: (user: UserViewModel) => any;

  let form: HTMLFormElement;
  let isFormValid = false;
  let loading = false;

  let user: UserCreateParams;

  $: if (modalVisible) user = createDefaultUser();

  async function addUser() {
    try {
      loading = true;
      const newUser = await userService.addUser(user);
      onUserAdded(newUser);
    } catch (e) {
      notifyError({ message: 'Nie można dodać użytkownika: ' + e.message });
    }
    loading = false;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Dodaj użytkownika"
  confirmText="Dodaj"
  onConfirm={addUser}
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
    <Field
      label="Hasło"
      required
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
