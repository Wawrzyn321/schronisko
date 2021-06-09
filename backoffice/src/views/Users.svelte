<script lang="ts">
  import Header from './../components/User/Header.svelte';
  import List from './../components/User/List.svelte';
  import { Toast } from 'svelma';
  import { onMount } from 'svelte';
  import type { UserViewModel } from '../prisma-types/viewModels/UserViewModel';
  import { insertInOrder } from '../common/insertInOrder';
  import { userService } from '../services/UserService';

  let users: UserViewModel[] = [];
  let searchPhrase = '';

  onMount(async () => (users = await userService.getAll()));

  $: filteredUsers = users.filter(
    (u: UserViewModel) =>
      !searchPhrase ||
      u.firstName.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      u.login.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  function onUserAdded(u: UserViewModel) {
    users = insertInOrder(users, u, (u) => u.lastName);
    Toast.create({
      message: 'Dodano użytkownika',
      type: 'is-success',
      position: 'is-bottom',
    });
  }

  function onUserDeleted(u: UserViewModel) {
    users = users.filter((e) => e.id !== u.id);
    Toast.create({
      message: `Usunięto użytkownika ${u.firstName} ${u.lastName}`,
      type: 'is-success',
      position: 'is-bottom',
    });
  }

  function onUserEdited(u: UserViewModel) {
    const user = users.find((user) => user.id === u.id);
    const index = users.indexOf(user);
    users = [...users.slice(0, index), u, ...users.slice(index + 1)];
  }
</script>

<main>
  <Header {onUserAdded} bind:searchPhrase />
  <List {onUserDeleted} {onUserEdited} users={filteredUsers} />
</main>
