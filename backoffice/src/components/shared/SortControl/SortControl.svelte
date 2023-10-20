<script lang="ts">
  import { ChevronUpIcon, ChevronDownIcon } from 'svelte-feather-icons';
  import type { SortingOrder } from './SortControl';
  import type { AnimalSortingParams } from '../../Animals/AnimalsHeader/AnimalSortingParams';

  export let sortingParams: AnimalSortingParams;
  export let type: AnimalSortingParams['sortBy'];
  export let setOrdering: (order: SortingOrder, type: AnimalSortingParams['sortBy']) => void; 

  function buildOnClickHandler(order: SortingOrder) {
    return () => {
      if (sortingParams.sortBy !== type) {
        setOrdering(order, type);
        return;
      }

      if (sortingParams.order !== order) {
        setOrdering(order, type);
      } else {
        setOrdering(null, type);
      }
    };
  }
</script>

<div class="sort-control">
  <button class="g-button-transparent" on:click={buildOnClickHandler('ASC')}>
    <ChevronUpIcon
      size="1.0x"
      class={sortingParams.sortBy === type && sortingParams.order === 'ASC'
        ? 'selected'
        : ''}
    />
  </button>
  <button class="g-button-transparent" on:click={buildOnClickHandler('DESC')}>
    <ChevronDownIcon
      size="1.0x"
      class={sortingParams.sortBy === type && sortingParams.order === 'DESC'
        ? 'selected'
        : ''}
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
