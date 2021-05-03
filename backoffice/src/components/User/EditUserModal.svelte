<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import PermissionsForm from './PermissionsForm.svelte';
  import { userService } from '../../services/UserService';

  export let modalVisible: boolean;
  export let user: UserViewModel;
  export let onUserEdited: (u: UserViewModel) => void;

  let permissions: Permission[];
  let isActive: boolean;

  const onShow = async (_) => {
    if (!user) return;
    isActive = user.isActive;
    permissions = await userService.getPermissions(user.id);
  };

  $: onShow(user);

  async function updateUser() {
    const updatedUser = await userService.update({
      ...user,
      permissions,
      isActive,
    });
    onUserEdited(updatedUser);
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