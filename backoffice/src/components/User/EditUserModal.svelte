<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import PriviledgesForm from './PriviledgesForm.svelte';
  import type { Priviledge } from '.prisma/client';
  import { userService } from '../../services/UserService';

  export let modalVisible: boolean;
  export let user: UserViewModel;
  export let onUserEdited: (u: UserViewModel) => void;

  let priviledges: Priviledge[];
  let isActive: boolean;

  const onShow = async (_) => {
    if (!user) return;
    isActive = user.isActive;
    priviledges = await userService.getPriviledges(user.id);
  };

  $: onShow(user);

  async function updateUser() {
    const updatedUser = await userService.update({
      ...user,
      priviledges,
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
    {#if priviledges}
      <PriviledgesForm
        {priviledges}
        updatePriviledges={(p) => (priviledges = p)}
      />
    {:else}
      <em>Ładowanie uprawnień...</em>
    {/if}
  </form>
</Modal>

<style>
  label {
    margin-bottom: 16px;
  }
</style>