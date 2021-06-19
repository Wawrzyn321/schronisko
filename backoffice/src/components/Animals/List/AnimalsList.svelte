<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { Edit2Icon, Trash2Icon } from 'svelte-feather-icons';

  import DeleteAnimalModal from './../DeleteAnimalModal.svelte';
  import DateFromTimestamp from '../../DateFromTimestamp.svelte';
  import AnimalsListHeader from './AnimalsListHeader.svelte';
  import type { Animal } from '.prisma/client';
  import {
    animalGendersMap,
    animalLocationsMap,
    animalCategoriesMap,
    animalTypesMap,
  } from './../animalMetadata';
  import type { AnimalColumnParams } from './../AnimalsHeader/AnimalColumnParams';
  import type { AnimalFilteringParams } from './../AnimalsHeader/AnimalFilteringParams';
  import type { AnimalSortingParams } from './../AnimalsHeader/AnimalSortingParams';

  export let animals: Animal[];
  export let columnParams: AnimalColumnParams;
  export let filteringParams: AnimalFilteringParams;
  export let sortingParams: AnimalSortingParams;
  export let onAnimalDeleted: (animal: Animal) => any;

  let deleteModalVisible = false;
  let selectedAnimal: Animal = null;
</script>

<table class="table is-fullwidth">
  <AnimalsListHeader {columnParams} bind:filteringParams bind:sortingParams />
  {#each animals as animal}
    <tr>
      <td>
        <a href={`/#/news/${animal.id}`}>
          {animal.name}
        </a>
      </td>
      {#if columnParams.showDescription}
        <td class="g-table-ellipsis">
          {animal.description}
        </td>
      {/if}
      <td>
        {animalTypesMap[animal.type]}
      </td>
      {#if columnParams.showGender}
        <td>
          {animalGendersMap[animal.gender]}
        </td>
      {/if}
      {#if columnParams.showLocation}
        <td>
          {animalLocationsMap[animal.location]}
        </td>
      {/if}
      {#if columnParams.showCategory}
        <td>
          {animalCategoriesMap[animal.category]}
        </td>
      {/if}
      {#if columnParams.showTimestamp}
        <td>
          <DateFromTimestamp timestamp={animal.addedDate} />
        </td>
      {/if}
      <td class="is-public-column">
        {animal.isPublic ? 'TAK' : 'NIE'}
      </td>
      <td class="g-text-align-right g-actions-header">
        <Button
          type="is-primary"
          on:click={() => push(`/animals/${animal.id}`)}
        >
          <Edit2Icon size="1.0x" />
        </Button>
        <Button
          type="is-danger"
          on:click={() => {
            selectedAnimal = animal;
            deleteModalVisible = true;
          }}
        >
          <Trash2Icon size="1.0x" />
        </Button>
      </td>
    </tr>
  {/each}
</table>
<DeleteAnimalModal
  bind:modalVisible={deleteModalVisible}
  {onAnimalDeleted}
  animal={selectedAnimal}
/>

<style lang="scss">
  .is-public-column {
    width: 190px;
  }
</style>
