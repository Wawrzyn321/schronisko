<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  export let searchPhrase = '';
</script>

<header>
  <div class="g-flex-between-100">
    <h1>Newsy</h1>
    <div>
      <input placeholder="Szukaj..." bind:value={searchPhrase} />
      <Button type="is-primary" on:click={() => push('/new-news')}>+</Button>
    </div>
  </div>
  <p class="g-description">Tutaj są dynamiczne posty, wyświetlane na stronie głównej.</p>
</header>

<style lang="scss">

  header {
    margin-bottom: 32px;
  }
  
  input {
    vertical-align: text-top;
  }
</style>
