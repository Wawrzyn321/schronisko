<script lang="ts">
  import SortControl from './../../shared/SortControl/SortControl.svelte';
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

  function setSortingOrder(
    order: AnimalSortingParams['order'],
    sortBy: AnimalSortingParams['sortBy']
  ) {
    sortingParams = { order, sortBy };
  }

</script>

<tr>
  {#if columnParams.showImage}
    <th>Miniaturka</th>
  {/if}
  <th>
    <div style="display: flex">
      Imię
      <SortControl {sortingParams} type="name" setOrdering={setSortingOrder} />
    </div>
  </th>
  <th> Numer ewidencyjny </th>
  <!-- {#if columnParams.showDescription}
    <th class="g-table-ellipsis">Opis</th>
  {/if} -->
  <th>
    <div style="display: flex">
      <span>Rodzaj</span>
      <FilteringDropdown
        bind:filteringParams
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
          values={animalCategories}
          valuesMap={animalCategoriesMap}
          filteringProperty="categoryFilter"
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showContactInfo}
    <th>Dane kontaktowe</th>
  {/if}
  {#if columnParams.showVirtualCaretaker}
    <th>Opiekun wirtualny</th>
  {/if}
  {#if columnParams.showAddedAt}
    <th>
      <div style="display: flex">
        Data dodania <SortControl
          {sortingParams}
          type="addedAt"
          setOrdering={setSortingOrder}
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showModifiedAt}
    <th>
      <div style="display: flex">
        Ostatnia modyfikacja <SortControl
          {sortingParams}
          type="modifiedAt"
          setOrdering={setSortingOrder}
        />
      </div>
    </th>
  {/if}
  {#if columnParams.showNote}
    <th class="g-table-ellipsis">Notatka</th>
  {/if}
  <th class="is-public-column">
    <label>
      Widoczny na stronie
      <input type="checkbox" bind:checked={filteringParams.showOnlyPublic} />
    </label>
  </th>
  <th class="g-text-align-right g-table-actions" />
</tr>
