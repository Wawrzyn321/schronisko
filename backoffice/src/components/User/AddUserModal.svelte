<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input } from 'svelma';
  import { createDefaultUser } from './UserCreateParams';
  import type { UserCreateParams } from './UserCreateParams';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import PriviledgesForm from './PriviledgesForm.svelte';
  import { userService } from '../../services/UserService';

  export let modalVisible: boolean;
  export let onUserAdded: (user: UserViewModel) => any;

  let form: HTMLFormElement;
  let isFormValid = false;

  let user: UserCreateParams = {priviledges:[]};

  const onMounted = (visible: boolean) => {
    if (visible) user = createDefaultUser();
  };

  $: onMounted(modalVisible);

  async function addUser() {
    const newUser = await userService.addUser(user);
    onUserAdded(newUser);
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
    <Field label="Email">
      <Input
        required
        type="email"
        bind:value={user.email}
        placeholder="Email"
      />
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
    <PriviledgesForm
      priviledges={user.priviledges}
      updatePriviledges={(p) => (user.priviledges = p)}
    />
  </form>
</Modal>
