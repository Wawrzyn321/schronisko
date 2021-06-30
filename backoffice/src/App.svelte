<script lang="ts">
  import Router from 'svelte-spa-router';
  import NotificationContext from './contexts/NotificationContext.svelte';
  import Nav from './routing/Nav.svelte';
  import { routes } from './routing/routes';
</script>

<NotificationContext>
  <Nav />
  <Router {routes} />
</NotificationContext>

<style lang="scss">
  :global(a.active) {
    font-weight: bolder;
  }
</style>
