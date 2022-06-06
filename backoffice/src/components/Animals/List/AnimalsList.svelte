<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { Edit2Icon, Trash2Icon } from 'svelte-feather-icons';

  import DeleteAnimalModal from './../DeleteAnimalModal.svelte';
  import DateFromTimestamp from '../../shared/DateFromTimestamp.svelte';
  import AnimalsListHeader from './AnimalsListHeader.svelte';
  import Loader from '../../shared/Loader.svelte';
  import {
    Animal,
    AnimalCategory,
    AnimalType,
    Permission,
    VirtualCaretakerType,
  } from '.prisma/client';
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
  import { STATIC_URL } from '../../../services/config';
  import EmptyListMessage from '../../shared/EmptyListMessage.svelte';
  import type { AnimalListElement } from '../../../common/types';
  import { auth } from '../../../contexts/auth.context';

  export let animals: AnimalListElement[];
  export let loading: boolean;
  export let columnParams: AnimalColumnParams;
  export let filteringParams: AnimalFilteringParams;
  export let sortingParams: AnimalSortingParams;
  export let onAnimalDeleted: (animal: Animal) => any;

  let deleteModalVisible = false;
  let selectedAnimal: AnimalListElement = null;

  const canEditAnimals = $auth.user.permissions.includes(Permission.ANIMAL);

  function restrictStringLength(str: string, chars = 40): string {
    if (str.length <= chars) {
      return str;
    } else {
      return str.substr(0, chars) + '...';
    }
  }
</script>

<table class="table is-fullwidth">
  <AnimalsListHeader {columnParams} bind:filteringParams bind:sortingParams />
  {#each animals as animal}
    <tr>
      {#if columnParams.showImage}
        <td style="padding-bottom: 0">
          <a href={`/#/animals/${encodeURIComponent(animal.id)}`}>
            <img
              width={152}
              height={112}
              src={animal.imageName
                ? `${STATIC_URL}/animals/${animal.imageName}`
                : `/img/placeholders/${
                    animal.type === AnimalType.DOG ? 'pies' : 'kot'
                  }.png`}
              alt={animal.name}
              class:is-grayscale={animal.category ===
                AnimalCategory.ZaTeczowymMostem}
            />
          </a>
        </td>
      {/if}
      <td>
        <a href={`/#/animals/${encodeURIComponent(animal.id)}`}>
          {animal.name}
        </a>
      </td>
      <td>
        {animal.refNo}
      </td>
      <!-- {#if columnParams.showDescription}
        <td class="g-table-ellipsis">
          {restrictStringLength(animal.description)}
        </td>
      {/if} -->
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
          {animalLocationsMap[animal.location] || '-'}
          {#if animal.locationDescription}
            ({animal.locationDescription})
          {/if}
        </td>
      {/if}
      {#if columnParams.showCategory}
        <td>
          {animalCategoriesMap[animal.category]}
        </td>
      {/if}
      {#if columnParams.showContactInfo}
        <td class="g-table-ellipsis">
          {restrictStringLength(animal.contactInfo)}
        </td>
      {/if}
      {#if columnParams.showVirtualCaretaker}
        <td>
          {virtualCaretakerTypesMap[animal.virtualCaretakerType]}
          {#if animal.virtualCaretakerType === VirtualCaretakerType.Znalazl && animal.virtualCaretakerName}
            ({animal.virtualCaretakerName})
          {/if}
        </td>
      {/if}
      {#if columnParams.showNote}
        <td class="g-table-ellipsis">
          {restrictStringLength(animal.note || '-')}
        </td>
      {/if}
      {#if columnParams.showAddedDate}
        <td>
          <DateFromTimestamp timestamp={animal.addedDate} />
        </td>
      {/if}
      <td class="is-public-column">
        {animal.isPublic ? 'TAK' : 'NIE'}
      </td>
      <td class="g-text-align-right g-table-actions">
        <Button
          type="is-primary"
          aria-label={'Edytuj zwierzę ' + animal.name}
          on:click={() => push(`/animals/${animal.id}`)}
          disabled={!canEditAnimals}
        >
          <Edit2Icon size="1.0x" />
        </Button>
        <Button
          type="is-danger"
          aria-label={'Usuń zwierzę ' + animal.name}
          on:click={() => {
            selectedAnimal = animal;
            deleteModalVisible = true;
          }}
          disabled={!canEditAnimals}
        >
          <Trash2Icon size="1.0x" />
        </Button>
      </td>
    </tr>
  {/each}
</table>
{#if loading}
  <Loader />
{/if}
{#if !loading && !animals.length}
  <EmptyListMessage entityType="zwierząt" />
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

  .is-grayscale {
    filter: grayscale(1);
  }
</style>
