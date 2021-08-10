<script lang="ts">
  import { onMount } from 'svelte';
  import { animalsService } from '../services/AnimalsService';
  import AnimalsHeader from '../components/Animals/AnimalsHeader/AnimalsHeader.svelte';
  import AnimalsList from '../components/Animals/List/AnimalsList.svelte';
  import type { Animal } from '.prisma/client';
  import { createDefaultColumnParams } from '../components/Animals/AnimalsHeader/AnimalColumnParams';
  import {
    applyFiltering,
    createDefaultFilteringParams,
  } from '../components/Animals/AnimalsHeader/AnimalFilteringParams';
  import {
    applySorting,
    createDefaultSortingParams,
  } from '../components/Animals/AnimalsHeader/AnimalSortingParams';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import Pagination from '../components/shared/Pagination/Pagination.svelte';
  import { paginate } from '../components/shared/Pagination/pagination';

  let animals: Animal[] = [];
  let loading = false;
  let columnParams = createDefaultColumnParams();
  let filteringParams = createDefaultFilteringParams();
  let sortingParams = createDefaultSortingParams();

  let currentPage = 0;
  let pageSize = 10;

  onMount(async () => {
    loading = true;
    try {
      animals = await animalsService.getInitial();
      loading = false;
      animals = await animalsService.getAll();
    } catch (e) {
      notifyError({
        message: 'Błąd pobierania zwierząt: ' + e.message,
      });
    }
  });

  $: filteredAnimals = applySorting(
    applyFiltering(animals, filteringParams),
    sortingParams
  );

  $: paginatedAnimals = paginate(filteredAnimals, pageSize, currentPage);

  function onAnimalDeleted(deletedAnimal: Animal) {
    animals = animals.filter((a) => a.id !== deletedAnimal.id);
    notifySuccess({ message: `Usunięto zwierzę ${deletedAnimal.name}` });
  }
</script>

<main>
  <AnimalsHeader
    bind:searchPhrase={filteringParams.searchPhrase}
    bind:columnParams
  />
  <AnimalsList
    animals={paginatedAnimals}
    {loading}
    {onAnimalDeleted}
    {columnParams}
    bind:filteringParams
    bind:sortingParams
  />
  {#if !loading && filteredAnimals.length}
    <Pagination
      bind:pageSize
      itemsCount={filteredAnimals.length}
      bind:currentPage
    />
  {/if}
</main>
