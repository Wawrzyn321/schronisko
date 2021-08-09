<script lang="ts">
  import SortControl from './../../SortControl/SortControl.svelte';
  import type { AnimalColumnParams } from './../AnimalsHeader/AnimalColumnParams';
  import type { AnimalFilteringParams } from './../AnimalsHeader/AnimalFilteringParams';
  import type { AnimalSortingParams } from './../AnimalsHeader/AnimalSortingParams';
  import FilteringDropdown from './FilteringDropdown.svelte';
  import {
    animalGenders,
    animalCategories,
    animalTypes,
    animalLocations,
    animalGendersMap,
    animalLocationsMap,
    animalCategoriesMap,
    animalTypesMap,
  } from './../animalMetadata';
  export let columnParams: AnimalColumnParams;
  export let filteringParams: AnimalFilteringParams;
  export let sortingParams: AnimalSortingParams;
</script>

<tr>
  {#if columnParams.showImage}
    <th>Miniaturka</th>
  {/if}
  <th>
    <div style="display: flex">
      Imię <SortControl bind:sortingOrder={sortingParams.sortByName} />
    </div>
  </th>
  {#if columnParams.showDescription}
    <th class="g-table-ellipsis">Opis</th>
  {/if}
  <th>
    <div style="display: flex">
      <span>Rodzaj</span>
      <FilteringDropdown
        bind:filteringParams
        size="sm"
        values={animalTypes}
        valuesMap={animalTypesMap}
        filteringProperty="typeFilter"
      />
    </div>
  </th>
  {#if columnParams.showGender}
    <th>
      <div style="display: flex">
        <span>Płeć</span>
        <FilteringDropdown
          bind:filteringParams
          size="sm"
          values={animalGenders}
          valuesMap={animalGendersMap}
          filteringProperty="genderFilter"
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showLocation}
    <th>
      <div style="display: flex">
        <span>Miejsce przebywania</span>
        <FilteringDropdown
          bind:filteringParams
          size="bg"
          values={animalLocations}
          valuesMap={animalLocationsMap}
          filteringProperty="locationFilter"
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showCategory}
    <th>
      <div style="display: flex">
        <span>Kategoria</span>
        <FilteringDropdown
          bind:filteringParams
          size="bg"
          values={animalCategories}
          valuesMap={animalCategoriesMap}
          filteringProperty="categoryFilter"
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showVirtualCaretaker}
    <th>Opiekun wirtualny</th>
  {/if}
  {#if columnParams.showAddedDate}
    <th>
      <div style="display: flex">
        Data dodania <SortControl
          bind:sortingOrder={sortingParams.sortByDate}
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showNote}
    <th class="g-table-ellipsis">Notatka</th>
  {/if}
  <th class="is-public-column">
    <input type="checkbox" bind:checked={filteringParams.showOnlyPublic} />
    Widoczny na stronie
  </th>
  <th class="g-text-align-right g-actions-header" />
</tr>
