<script lang="ts">
  import { auth, logout } from './../auth.context';
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
  import type { Priviledge } from '@prisma/client';

  interface Route {
    name: string;
    requiredPermission: Priviledge;
    path: string;
  }

  const routes: Route[] = [
    {
      name: 'Użytkownicy',
      requiredPermission: 'USER',
      path: '/users',
    },
    {
      name: 'Stałe posty',
      requiredPermission: 'CONST_POST',
      path: '/const-posts',
    },
    {
      name: 'Posty',
      requiredPermission: 'POST',
      path: '/posts',
    },
    {
      name: 'Zwierzęta',
      requiredPermission: 'ANIMAL',
      path: '/animals',
    },
  ];
</script>

<nav>
  <a href="https://www.schronisko.sosnowiec.pl/" target="_blank">
    Strona schroniska</a
  >
  {#if $auth}
    <ul>
      {#each routes as route}
        {#if $auth.user.priviledges.includes(route.requiredPermission)}
          <li>
            <a use:link use:active href={`${route.path}`}>{route.name}</a>
          </li>
        {/if}
      {/each}
      <li><a use:link use:active href="/profile">Mój profil</a></li>
    </ul>
    <div class="user-panel">
      <span>{$auth.user.firstName} {$auth.user.lastName}</span>
      <button class="link" on:click={logout}>Wyloguj się</button>
    </div>
  {/if}
</nav>

<style lang="scss">
  nav {
    vertical-align: middle;
    height: 60px;
    background-color: whitesmoke;
    display: flex;
    place-items: center;
    padding: 0 24px;
    white-space: nowrap;

    li {
      display: inline-block;
      margin-right: 10px;
    }

    a {
      display: inline-block;
      margin-right: 16px;
    }
  }
  .user-panel {
    margin-left: auto;
  }
</style>
