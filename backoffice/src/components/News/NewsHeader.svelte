<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  export let searchPhrase = '';
</script>

<header>
  <div class="g-flex-between-100">
    <h1>Newsy</h1>
    <div style="display: flex">
      <input
        placeholder="Szukaj..."
        type="search"
        bind:value={searchPhrase}
        style="margin-right: 10px"
      />
      <Button type="is-primary" on:click={() => push('/news-add')} aria-label="Dodaj newsa"
        ><strong>+</strong></Button
      >
    </div>
  </div>
  <p class="g-description">
    Tutaj są dynamiczne posty, wyświetlane na stronie głównej.
  </p>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
  }

  input {
    vertical-align: text-top;
  }
</style>
