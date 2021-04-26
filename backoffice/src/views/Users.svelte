<script lang="ts">
  import Header from './../components/User/Header.svelte';
  import List from './../components/User/List.svelte';
  import { Toast } from 'svelma';
  import { onMount } from 'svelte';
  import type { UserViewModel } from '../prisma-types/viewModels/UserViewModel';
  import { throwingFetch } from '../services/throwingFetch';
  import { API_URL } from '../services/config';
  import { insertInOrder } from '../common/insertInOrder';
  import type { Priviledge } from '.prisma/client';

  onMount(async () => {
    users = await throwingFetch(`${API_URL}/api/users`);
  });

  let users: any[] = [];

  function onUserAdded(u: UserViewModel) {
    users = insertInOrder(users, u, u => u.lastName);
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
    const user = users.find(user => user.id === u.id);
    const index = users.indexOf(user);
    users = [...users.slice(0, index), u, ...users.slice(index + 1)];
  }
</script>

<main>
  <Header {onUserAdded} />
  <List {onUserDeleted} {onUserEdited} {users} />
</main>

<style lang="scss">
  main {
    margin: 24px;
  }
</style>
