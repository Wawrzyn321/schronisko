<script lang="ts">
  import UsersHeader from '../components/User/UsersHeader.svelte';
  import UsersList from '../components/User/UsersList.svelte';
  import { onMount } from 'svelte';
  import type { UserViewModel } from '../common/UserViewModel';
  import { insertInOrder } from '../common/insertInOrder';
  import { userService } from '../services/UserService';
  import { notifyError, notifySuccess } from '../contexts/notification.context';

  let users: UserViewModel[] = [];
  let searchPhrase = '';
  let loading = true;

  onMount(async () => {
    try {
      users = await userService.getAll();
    } catch (e) {
      notifyError({
        message: 'Błąd pobierania użytkowników: ' + e.message,
      });
    }
    loading = false;
  });

  $: filteredUsers = users.filter((u: UserViewModel) => {
    const includes = (prop: string) =>
      prop.toLowerCase().includes(searchPhrase.toLowerCase());

    return (
      !searchPhrase ||
      includes(u.firstName) ||
      includes(u.lastName) ||
      includes(u.login)
    );
  });

  function onUserAdded(u: UserViewModel) {
    users = insertInOrder(users, u, (u) => u.lastName);
    notifySuccess({ message: 'Dodano użytkownika.' });
  }

  function onUserDeleted(u: UserViewModel) {
    users = users.filter((e) => e.id !== u.id);
    notifySuccess({
      message: `Usunięto użytkownika ${u.firstName} ${u.lastName}.`,
    });
  }

  function onUserUpdated(updatedUser: UserViewModel, notify?: boolean) {
    const user = users.find((user) => user.id === updatedUser.id);
    if (!user) {
      throw Error(`Brak użytkownika o ID ${updatedUser.id}`)
    }
    const index = users.indexOf(user);
    users = [...users.slice(0, index), updatedUser, ...users.slice(index + 1)];
    if (notify !== false) {
      notifySuccess({
        message: `Zaktualizowano dane użytkownika ${updatedUser.firstName} ${updatedUser.lastName}.`,
      });
    }
  }
</script>

<main>
  <UsersHeader {onUserAdded} bind:searchPhrase />
  <UsersList {onUserDeleted} {loading} onUserUpdated={onUserUpdated} users={filteredUsers} />
</main>
