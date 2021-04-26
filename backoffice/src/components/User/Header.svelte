<script lang="ts">
  import { Button } from 'svelma';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import AddUserModal from './AddUserModal.svelte';

  export let onUserAdded: (u: UserViewModel) => void;

  let createModalVisible = false;
  const showCreateModal = () => (createModalVisible = true);
</script>

<header>
  <h1>Użytkownicy</h1>
  <Button type="is-primary" on:click={showCreateModal}>+</Button>
</header>
<AddUserModal bind:modalVisible={createModalVisible} {onUserAdded} />

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

    h1 {
      font-size: 150%;
    }
  }
</style>
