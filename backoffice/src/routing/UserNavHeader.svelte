<script lang="ts">
  import { auth, logout } from '../contexts/auth.context';
  import { Button } from 'svelma';
  import { Edit2Icon } from 'svelte-feather-icons';
  import EditSelfModal from './../components/User/EditSelfModal.svelte';

  let editSelfModalVisible = false;
</script>

<EditSelfModal bind:modalVisible={editSelfModalVisible} />
<div class="user-panel">
  <span>{$auth.user.firstName} {$auth.user.lastName}</span>
  <Button
    type="is-primary"
    id="edit-self-button"
    on:click={() => (editSelfModalVisible = true)}
  >
    <Edit2Icon size="0.5x" />
  </Button>
  <button class="link" on:click={logout}>Wyloguj się</button>
</div>

<style lang="scss">
  .user-panel {
    margin-left: auto;
  }

  :global(#edit-self-button) {
    width: 16px;
    height: 16px;
    padding: 2px;
    vertical-align: middle;
  }

  :global(#edit-self-button > span) {
    display: grid;
  }
</style>
