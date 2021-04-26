<script lang="ts">
  import { Trash2Icon, Edit2Icon } from 'svelte-feather-icons';
  import { Button } from 'svelma';
  import { isSelf } from '../../auth.context';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import DeleteUserModal from './DeleteUserModal.svelte';
  import EditUserModal from './EditUserModal.svelte';
  import EditSelfModal from './EditSelfModal.svelte';

  export let onUserDeleted: (u: UserViewModel) => void;
  export let onUserEdited: (u: UserViewModel) => void;
  export let users: UserViewModel[];

  let showActive = true;

  let deleteModalVisible = false;
  let editModalVisible = false;
  let editSelfModalVisible = false;
  let selectedUser: UserViewModel;

  $: filteredUsers = users.filter(u => !showActive || u.isActive);
</script>

<table class="table is-fullwidth">
  <tr>
    <th>Imię</th>
    <th>Nazwisko</th>
    <th>Email</th>
    <th class="is-active-header">
      <input type="checkbox" bind:checked={showActive}/>
      Aktywny
    </th>
    <th class="actions-header" />
  </tr>
  {#each filteredUsers as user}
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td class="text-align-center is-active-header">{user.isActive ? 'TAK' : 'NIE'}</td>
      <td class="text-align-right actions-header">
        <Button
          type="is-primary"
          on:click={() => {
            if (isSelf(user)) {
              editSelfModalVisible = true;
            } else {
              selectedUser = { ...user };
              editModalVisible = true;
            }
          }}
        >
          <Edit2Icon size="1.0x" />
        </Button>
        <Button
          type="is-danger"
          disabled={isSelf(user)}
          on:click={() => {
            selectedUser = user;
            deleteModalVisible = true;
          }}
        >
          <Trash2Icon size="1.0x" />
        </Button>
      </td>
    </tr>
  {/each}
</table>
<DeleteUserModal
  bind:modalVisible={deleteModalVisible}
  {onUserDeleted}
  user={selectedUser}
/>
<EditUserModal
  bind:modalVisible={editModalVisible}
  {onUserEdited}
  user={selectedUser}
/>
<EditSelfModal
  bind:modalVisible={editSelfModalVisible}
  {onUserEdited}
/>

<style lang="scss">
  input[type=checkbox] {
    display: inline-block;
    margin-left: 10px;
  }

  .is-active-header {
    width: 120px;
  }
  .actions-header {
    width: 120px;
  }
</style>
