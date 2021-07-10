<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { Edit2Icon, Trash2Icon } from 'svelte-feather-icons';

  import DeleteAnimalModal from './../DeleteAnimalModal.svelte';
  import DateFromTimestamp from '../../DateFromTimestamp.svelte';
  import AnimalsListHeader from './AnimalsListHeader.svelte';
  import Loader from './../../../components/Loader.svelte';
  import { Animal, VirtualCaretakerType } from '.prisma/client';
  import {
    animalGendersMap,
    animalLocationsMap,
    animalCategoriesMap,
    animalTypesMap,
    virtualCaretakerTypesMap,
  } from './../animalMetadata';
  import type { AnimalColumnParams } from './../AnimalsHeader/AnimalColumnParams';
  import type { AnimalFilteringParams } from './../AnimalsHeader/AnimalFilteringParams';
  import type { AnimalSortingParams } from './../AnimalsHeader/AnimalSortingParams';
  import { API_URL } from '../../../services/config';
  import EmptyListMessage from '../../EmptyListMessage.svelte';

  export let animals: Animal[];
  export let loading: boolean;
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
      {#if columnParams.showImage}
        <td style="padding-bottom: 0">
          <img src={`${API_URL}/${animal.imageName}`} alt={animal.name} />
        </td>
      {/if}
      <td>
        <a href={`/#/animals/${animal.id}`}>
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
      {#if columnParams.showVirtualCaretaker}
        <td>
          {virtualCaretakerTypesMap[animal.virtualCaretakerType]}
          {#if animal.virtualCaretakerType === VirtualCaretakerType.Znalazl}
            ({animal.virtualCaretakerName})
          {/if}
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
{#if !loading && !animals.length}
  <EmptyListMessage entityType="zwierząt" />
{/if}
{#if loading}
  <Loader />
{/if}

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
