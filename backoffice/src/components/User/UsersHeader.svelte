<script lang="ts">
  import { Button } from 'svelma';
  import type { UserViewModel } from '../../common/UserViewModel';
  import AddUserModal from './AddUserModal.svelte';

  export let searchPhrase = '';
  export let onUserAdded: (u: UserViewModel) => void;

  let createModalVisible = false;
  const showCreateModal = () => (createModalVisible = true);
</script>

<header>
  <h1>Użytkownicy</h1>
  <div style="display: flex">
    <input placeholder="Szukaj..." style="margin-right: 10px" bind:value={searchPhrase} />
    <Button type="is-primary" on:click={showCreateModal}><strong>+</strong></Button>
  </div>
</header>
<AddUserModal bind:modalVisible={createModalVisible} {onUserAdded} />

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  input {
    vertical-align: text-top;
  }
</style>
