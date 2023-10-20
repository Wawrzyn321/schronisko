<script lang="ts">
  import { Button } from 'svelma';
  import { FilterIcon } from 'svelte-feather-icons';
  import Dropdown from '../../shared/Dropdown.svelte';
  import type { AnimalColumnParams } from './AnimalColumnParams';

  export let params: AnimalColumnParams;

  const dataRows: { caption: string; property: keyof AnimalColumnParams }[] = [
    { caption: 'Miniaturka', property: 'showImage' },
    // { caption: 'Opis', property: 'showDescription' },
    { caption: 'Płeć', property: 'showGender' },
    { caption: 'Miejsce', property: 'showLocation' },
    { caption: 'Kategoria', property: 'showCategory' },
    { caption: 'Dane kontaktowe', property: 'showContactInfo' },
    { caption: 'Opiekun wirtualny', property: 'showVirtualCaretaker' },
    { caption: 'Data dodania', property: 'showAddedAt' },
    { caption: 'Ostatnia modyfikacja', property: 'showModifiedAt' },
    { caption: 'Notatka', property: 'showNote' },
  ];

</script>

<Dropdown>
  <Button
    slot="trigger"
    type="is-primary"
    style="width: 40px"
    aria-label="Otwórz filtry"
  >
    <FilterIcon size="1.0x" />
  </Button>
  <div slot="content" class="dropdown-content">
    {#each dataRows as row}
      <label>
        <input
          checked={params[row.property]}
          type="checkbox"
          on:change={() => (params[row.property] = !params[row.property])}
        />
        {row.caption}
      </label>
    {/each}
  </div>
</Dropdown>
