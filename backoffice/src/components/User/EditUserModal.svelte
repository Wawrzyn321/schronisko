<script lang="ts">
  import Modal from '../shared/Modal.svelte';
  import type { UserViewModel } from '../../common/UserViewModel';
  import PermissionsForm from './PermissionsForm.svelte';
  import { userService } from '../../services/UserService';
  import type { Permission } from '@prisma-app/client';
  import { notifyError } from '../../contexts/notification.context';
  import Loader from '../shared/Loader.svelte';

  export let modalVisible: boolean;
  export let user: UserViewModel;
  export let onUserUpdated: (u: UserViewModel) => void;

  let permissions: Permission[];
  let isActive: boolean;
  let loading = false;

  const onShow = async (user: UserViewModel) => {
    loading = true;
    permissions = [];
    if (!user) return;
    isActive = user.isActive;
    try {
      permissions = await userService.getPermissions(user.id);
      loading = false;
    } catch (e) {
      notifyError({ message: 'Nie można pobrać uprawnień: ' + e.message });
    }
  };

  $: onShow(user);

  async function updateUser() {
    try {
      loading = true;
      const updatedData = await userService.updateUser(user.id, {
        permissions,
        isActive,
      });
      onUserUpdated({ ...user, ...updatedData });
    } catch (e) {
      notifyError({
        message: 'Nie udało się zaktualizować użytkownika: ' + e.message,
      });
      loading = false;
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title={`Edytuj użytkownika ${user?.login}`}
  confirmText="Zatwierdź"
  onConfirm={updateUser}
  disabledConfirm={loading}
>
  <form>
    {#if !loading}
      <label>
        <input
          checked={isActive}
          type="checkbox"
          on:change={() => (isActive = !isActive)}
        />
        Aktywny
      </label>
      <PermissionsForm
        {permissions}
        updatePermissions={(p) => (permissions = p)}
      />
    {:else}
      <div style="height: 50px">
        <Loader size="2em" />
      </div>
    {/if}
  </form>
</Modal>

<style lang="scss">
  label {
    margin-bottom: 16px;
  }
</style>
