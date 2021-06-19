<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import PermissionsForm from './PermissionsForm.svelte';
  import { userService } from '../../services/UserService';
  import type { Permission } from '.prisma/client';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let user: UserViewModel;
  export let onUserEdited: (u: UserViewModel) => void;

  let permissions: Permission[];
  let isActive: boolean;

  const onShow = async (_) => {
    if (!user) return;
    isActive = user.isActive;
    try {
      permissions = await userService.getPermissions(user.id);
    } catch (e) {
      notifyError({ message: 'Nie można pobrać uprawnień: ' + e.message });
    }
  };

  $: onShow(user);

  async function updateUser() {
    try {
      const updatedUser = await userService.updateUser({
        ...user,
        permissions,
        isActive,
      });
      onUserEdited(updatedUser);
    } catch (e) {
      notifyError({
        message: 'Nie udało się zaktualizować użytkownika: ' + e.message,
      });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Edytuj użytkownika"
  confirmText="Zatwierdź"
  onConfirm={updateUser}
>
  <form>
    <label>
      <input
        checked={isActive}
        type="checkbox"
        on:change={() => (isActive = !isActive)}
      />
      Aktywny
    </label>
    {#if permissions}
      <PermissionsForm
        {permissions}
        updatePermissions={(p) => (permissions = p)}
      />
    {:else}
      <em>Ładowanie uprawnień...</em>
    {/if}
  </form>
</Modal>

<style lang="scss">
  label {
    margin-bottom: 16px;
  }
</style>
