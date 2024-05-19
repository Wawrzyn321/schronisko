<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { FilterIcon } from 'svelte-feather-icons';
  import type { AnimalColumnParams } from './AnimalColumnParams';
  import AnimalsHeaderFiltering from './AnimalsHeaderFiltering.svelte';
  import { Permission } from '@prisma-app/client';
  import { auth } from '../../../contexts/auth.context';

  const canEditAnimals = $auth?.user.permissions.includes(Permission.ANIMAL);

  export let columnParams: AnimalColumnParams;
  export let searchPhrase = '';
</script>

<header class="animals-header">
  <div class="g-flex-between-100">
    <h1>Zwierzęta</h1>
    <div class="animals-header-container">
      <input placeholder="Szukaj..." type="search" bind:value={searchPhrase} />
      <Button
        style="margin: 0 4px"
        type="is-primary"
        aria-label="Dodaj zwierzę"
        on:click={() => push('/animals-add')}
        disabled={!canEditAnimals}
      >
        <strong>+</strong>
      </Button>
      <AnimalsHeaderFiltering bind:params={columnParams} />
    </div>
  </div>
  <p class="g-description">
    Użyj filtrów <FilterIcon size="0.8x" /> po prawej by wyświetlić więcej kolumn.
  </p>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
  }

  .animals-header-container {
    display: flex;
    margin-bottom: 16px;
  }

  input {
    vertical-align: text-top;
  }
</style>
