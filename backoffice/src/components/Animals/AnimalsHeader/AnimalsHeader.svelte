<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import type { AnimalColumnParams } from './AnimalColumnParams';
  import AnimalsHeaderFiltering from './AnimalsHeaderFiltering.svelte';

  export let columnParams: AnimalColumnParams;
  export let searchPhrase = '';
</script>

<header class="animals-header">
  <div class="g-flex-between-100">
    <h1>Zwierzęta</h1>
    <div style="display: flex">
      <input placeholder="Szukaj..." bind:value={searchPhrase} />
      <Button
        style="margin: 0 4px"
        type="is-primary"
        on:click={() => push('/add-animal')}
      >
        <strong>+</strong>
      </Button>
      <AnimalsHeaderFiltering bind:params={columnParams} />
    </div>
  </div>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
  }

  input {
    vertical-align: text-top;
  }
</style>
