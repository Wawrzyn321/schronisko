<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input, Toast } from 'svelma';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { auth } from '../../auth.context';
  import { userService } from './../../services/UserService';

  export let onSelfEdited: (u: UserViewModel) => void = undefined;
  export let modalVisible: boolean;

  let form: HTMLFormElement;
  let isFormValid = false;

  let user: UserViewModel;

  function onShow(_) {
    if (modalVisible) user = { ...$auth.user };
  }

  $: onShow(modalVisible);

  async function updateSelf() {
    const updatedUser = await userService.updateSelf(user);
    onSelfEdited && onSelfEdited(updatedUser);
    Toast.create({
      message: 'Twoje dane zostały zapisane',
      type: 'is-success',
      position: 'is-bottom',
    });
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
