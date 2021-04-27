<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input } from 'svelma';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { auth } from '../../auth.context';
  import { userService } from './../../services/UserService';

  export let onUserEdited: (u: UserViewModel) => void;
  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;

  let user: UserViewModel = {priviledges:[]};

  function onShow(_) {
    if (modalVisible) user = { ...$auth.user };
  }

  $: onShow(modalVisible);

  async function updateSelf() {
    const updatedUser = await userService.updateSelf(user);
    onUserEdited(updatedUser);
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
  </form>
</Modal>
