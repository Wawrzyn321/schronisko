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

  let animals: Animal[] = [];
  let loading = false;
  let columnParams = createDefaultColumnParams();
  let filteringParams = createDefaultFilteringParams();
  let sortingParams = createDefaultSortingParams();

  onMount(async () => {
    loading = true;
    try {
      animals = await animalsService.getAll();
      loading = false;
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
    animals={filteredAnimals}
    {loading}
    {onAnimalDeleted}
    {columnParams}
    bind:filteringParams
    bind:sortingParams
  />
</main>
