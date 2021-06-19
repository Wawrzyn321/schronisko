<script lang="ts">
  import { Button } from 'svelma';
  import { FilterIcon } from 'svelte-feather-icons';
  import Dropdown from '../../../components/Dropdown.svelte';
  import type { AnimalColumnParams } from './AnimalColumnParams';

  export let params: AnimalColumnParams;
</script>

<Dropdown>
  <Button slot="trigger" type="is-primary" style="width: 40px">
    <FilterIcon size="1.0x" />
  </Button>
  <div slot="content" class="dropdown-content">
    <label>
      <input
        checked={params.showDescription}
        type="checkbox"
        on:change={() => (params.showDescription = !params.showDescription)}
      />
      Opis
    </label>
    <label>
      <input
        checked={params.showGender}
        type="checkbox"
        on:change={() => (params.showGender = !params.showGender)}
      />
      Płeć
    </label>
    <label>
      <input
        checked={params.showLocation}
        type="checkbox"
        on:change={() => (params.showLocation = !params.showLocation)}
      />
      Miejsce
    </label>
    <label>
      <input
        checked={params.showCategory}
        type="checkbox"
        on:change={() => (params.showCategory = !params.showCategory)}
      />
      Kategoria
    </label>
    <label>
      <input
        checked={params.showTimestamp}
        type="checkbox"
        on:change={() => (params.showTimestamp = !params.showTimestamp)}
      />
      Data dodania
    </label>
  </div>
</Dropdown>

<style lang="scss">
  .dropdown-content {
    transform: translateX(-110px);
    width: 150px;
    padding: 10px;
    z-index: 1000;
  }
</style>
