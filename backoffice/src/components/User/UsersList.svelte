<script lang="ts">
  import { Trash2Icon, Edit2Icon, LockIcon } from 'svelte-feather-icons';
  import { Button } from 'svelma';
  import { isSelf } from '../../contexts/auth.context';
  import type { UserViewModel } from '../../common/UserViewModel';
  import DeleteUserModal from './DeleteUserModal.svelte';
  import EditUserModal from './EditUserModal.svelte';
  import EditSelfModal from './EditSelfModal.svelte';
  import ChangeUserPasswordModal from './ChangeUserPasswordModal.svelte';
  import ChangePasswordModal from './ChangePasswordModal.svelte';
  import Loader from '../shared/Loader.svelte';
  import EmptyListMessage from '../shared/EmptyListMessage.svelte';

  export let onUserDeleted: (u: UserViewModel) => void;
  export let onUserEdited: (u: UserViewModel, notify?: boolean) => void;
  export let users: UserViewModel[];
  export let loading: boolean;

  let showActive = true;

  let deleteModalVisible = false;
  let editModalVisible = false;
  let editSelfModalVisible = false;
  let edifSelfPasswordVisible = false;
  let changeUserPasswordModalVisible = false;
  let selectedUser: UserViewModel;

  $: filteredUsers = users.filter((u) => !showActive || u.isActive);
</script>

<table class="table is-fullwidth">
  <tr>
    <th>Imię</th>
    <th>Nazwisko</th>
    <th>Login</th>
    <th class="g-text-align-center">
      <input type="checkbox" bind:checked={showActive} />
      Aktywny
    </th>
    <th class="g-actions-header" />
  </tr>
  {#each filteredUsers as user}
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.login}</td>
      <td class="g-text-align-center">{user.isActive ? 'TAK' : 'NIE'}</td>
      <td class="g-text-align-right g-actions-header">
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
          type="is-primary"
          on:click={() => {
            if (isSelf(user)) {
              edifSelfPasswordVisible = true;
            } else {
              selectedUser = { ...user };
              changeUserPasswordModalVisible = true;
            }
          }}
        >
          <LockIcon size="1.0x" />
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
{#if !loading && !filteredUsers.length}
  <EmptyListMessage entityType="stron" />
{/if}
{#if loading}
  <Loader centered={true} />
{/if}
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
  onSelfEdited={onUserEdited}
/>
<ChangeUserPasswordModal
  bind:modalVisible={changeUserPasswordModalVisible}
  user={selectedUser}
/>
<ChangePasswordModal bind:modalVisible={edifSelfPasswordVisible} />

<style lang="scss">
  input[type='checkbox'] {
    display: inline-block;
    margin-left: 10px;
  }
</style>
