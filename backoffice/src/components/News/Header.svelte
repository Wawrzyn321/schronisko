<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  export let searchPhrase = '';
</script>

<header>
  <h1>Newsy</h1>
  <div>
    <input placeholder="Szukaj..." bind:value={searchPhrase} />
    <Button type="is-primary" on:click={() => push('/new-news')}>+</Button>
  </div>
</header>

<style lang="scss">
  input {
    vertical-align: text-top;
  }
</style>
