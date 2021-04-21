<script lang="ts">
  import GenericList from '../components/GenericList.svelte';
  import UserRenderer from './UserRenderer.svelte';
  import AddUserModal from './../components/User/AddUserModal.svelte';
  import DeleteUserModal from './../components/User/DeleteUserModal.svelte';
  import { Button, Toast } from 'svelma';
  import { onMount } from 'svelte';
  import { auth } from '../auth.context';
  import type { UserViewModel } from '../prisma-types/viewModels/UserViewModel';
  import type { ListAction } from '../components/ListAction';
import { throwingFetch } from '../common/throwingFetch';

  onMount(async () => {
    entries = await throwingFetch('http://localhost:3000/api/users');
  });

  let entries: any[] = [];

  let headerRenderer = ['Imię', 'Nazwisko', 'Email', 'Aktywny', ''];
  let createModalVisible = false;
  let deleteModalVisible = false;
  let selectedUser: UserViewModel;

  let actions = (user: UserViewModel): ListAction[] => [
    {
      type: 'edit',
      func: console.log,
    },
    {
      type: 'delete',
      disabled: $auth.user.email === user.email,
      func: (user: UserViewModel) => {
        selectedUser = user;
        deleteModalVisible = true;
      },
    },
  ];

  function onUserAdded(u: UserViewModel) {
    entries = [...entries, u];
    Toast.create({
      message: 'Stworzono użytkownika',
      type: 'is-success',
      position: 'is-bottom',
    });
  }

  function onUserDeleted(u: UserViewModel) {
    entries = entries.filter((e) => e.id !== u.id);
    Toast.create({
      message: 'Usunięto użytkownika',
      type: 'is-success',
      position: 'is-bottom',
    });
  }
</script>

<main>
  <header>
    <h1>Użytkownicy</h1>
    <Button type="is-primary" on:click={() => (createModalVisible = true)}>
      +
      </Button>
  </header>
  <GenericList
    {entries}
    {headerRenderer}
    {actions}
    rowRenderer={UserRenderer}
  />
  <AddUserModal bind:modalVisible={createModalVisible} {onUserAdded} />
  <DeleteUserModal
    bind:modalVisible={deleteModalVisible}
    {onUserDeleted}
    {selectedUser}
  />
</main>

<style lang="scss">
  main {
    margin: 24px;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

    h1 {
      font-size: 150%;
    }
  }
</style>
