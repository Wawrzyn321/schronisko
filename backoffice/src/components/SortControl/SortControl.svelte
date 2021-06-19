<script lang="ts">
  import { ChevronUpIcon, ChevronDownIcon } from 'svelte-feather-icons';
  import type { SortingOrder } from './SortControl';

  export let sortingOrder: SortingOrder;

  function setOrdering(order: SortingOrder) {
    return () => {
      if (sortingOrder !== order) {
        sortingOrder = order;
      } else {
        sortingOrder = null;
      }
    };
  }
</script>

<div class="sort-control">
  <button class="g-button-transparent" on:click={setOrdering('ASC')}>
    <ChevronUpIcon
      size="1.0x"
      class={sortingOrder === 'ASC' ? 'selected' : ''}
    />
  </button>
  <button class="g-button-transparent" on:click={setOrdering('DESC')}>
    <ChevronDownIcon
      size="1.0x"
      class={sortingOrder === 'DESC' ? 'selected' : ''}
    />
  </button>
</div>

<style lang="scss">
  :global(.selected) {
    stroke-width: 5px;
  }

  .sort-control {
    display: flex;
    flex-direction: column;
    width: 32px;

    & > button {
      padding: 0;
    }
  }
</style>
