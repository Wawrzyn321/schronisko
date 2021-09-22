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

  $: filteredUsers = users.filter(
    (u: UserViewModel) =>
      !searchPhrase ||
      u.firstName.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      u.login.toLowerCase().includes(searchPhrase.toLowerCase())
  );

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

  function onUserEdited(u: UserViewModel, notify: boolean) {
    const user = users.find((user) => user.id === u.id);
    const index = users.indexOf(user);
    users = [...users.slice(0, index), u, ...users.slice(index + 1)];
    if (notify !== false) {
      notifySuccess({
        message: `Zaktualizowano dane użytkownika ${u.firstName} ${u.lastName}.`,
      });
    }
  }
</script>

<main>
  <UsersHeader {onUserAdded} bind:searchPhrase />
  <UsersList {onUserDeleted} {loading} {onUserEdited} users={filteredUsers} />
</main>
