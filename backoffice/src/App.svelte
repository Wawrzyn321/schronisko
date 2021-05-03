<script lang="ts">
  import Router from 'svelte-spa-router';
  import Nav from './routing/Nav.svelte';
  import { routes } from './routing/routes';
</script>

<div>
  <Nav />
  <Router {routes} />
</div>

<style lang="scss">
  :global(a.active) {
    font-weight: bolder;
  }
</style>