<script lang="ts">
  import Dropdown from '../../Dropdown.svelte';
  import { FilterIcon } from 'svelte-feather-icons';
  import type { AnimalFilteringParams } from '../AnimalsHeader/AnimalFilteringParams';

  function updateFilter<T>(filterName: string, value: T) {
    return () => {
      const currentFilter: T[] = filteringParams[filterName];
      if (filteringParams[filterName].includes(value)) {
        filteringParams[filterName] = currentFilter.filter(
          (f: T) => f !== value
        );
      } else {
        filteringParams[filterName] = [...currentFilter, value];
      }
    };
  }

  export let filteringParams: AnimalFilteringParams;
  export let size: 'sm' | 'bg';
  export let values: any[];
  export let valuesMap: any;
  export let filteringProperty:
    | 'locationFilter'
    | 'genderFilter'
    | 'categoryFilter'
    | 'typeFilter';

  // wtf typescript
  let a: any[];
  $: a = filteringParams[filteringProperty];
</script>

<Dropdown>
  <button slot="trigger" class="g-button-transparent">
    <FilterIcon size="0.8x" />
  </button>
  <div slot="content" class={`dropdown-content dropdown-content-${size}`}>
    {#each values as value}
      <label>
        <input
          checked={a.includes(value)}
          type="checkbox"
          on:change={updateFilter(filteringProperty, value)}
        />
        {valuesMap[value]}
      </label>
    {/each}
  </div>
</Dropdown>

<style lang="scss">
  .dropdown-content {
    &-sm {
      transform: translateX(-75px);
      width: 100px;
      padding: 10px;
      z-index: 1000;
    }

    &-bg {
      transform: translateX(-175px);
      width: 220px;
      padding: 10px;
      z-index: 1000;
    }
  }
</style>
