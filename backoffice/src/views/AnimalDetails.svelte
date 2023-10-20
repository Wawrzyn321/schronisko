<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import Loader from '../components/shared/Loader.svelte';
  import AnimalForm from '../components/Animals/Form/AnimalForm.svelte';
  import UpdateHeader from '../components/Animals/UpdateHeader.svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import { animalsService } from '../services/AnimalsService';
  import { animalImagesService } from '../services/AnimalImagesService';
  import type { AnimalImageParams } from '../services/AnimalImagesService';
  import type { Animal, AnimalCategory } from '.prisma/client';
  import type { AnimalData } from '../services/AnimalsService';

  export let params: { id: string };

  let animal: Animal;
  let animalData: AnimalData;
  let images: AnimalImageParams[];
  let isValid: boolean = true;
  let isSaving: boolean;
  let prevCategory: AnimalCategory;

  onMount(async () => {
    const id = encodeURIComponent(params.id);
    try {
      animal = await animalsService.get(id);
      animalData = animal as AnimalData;
      prevCategory = animal.category;
    } catch (e) {
      notifyError({
        message: 'Nie można pobrać danych zwierzęcia: ' + e.message,
      });
      if (e.status === 404) {
        push('/animals');
        return;
      }
    }
    try {
      images = await animalImagesService.get(id);
    } catch (e) {
      notifyError({
        message: 'Nie można pobrać zdjęć zwierzęcia: ' + e.message,
      });
    }
  });

  async function updateAnimal() {
    try {
      isSaving = true;
      const updatedAnimal = await animalsService.update(animal, images);
      prevCategory = animal.category;
      notifySuccess({ message: 'Dane zwierzęcia zostały zapisane.' });
      animalData.imageData = null;
      animalData.imageName = updatedAnimal.imageName;
    } catch (e) {
      notifyError({
        message: 'Nie możnac zapisać danych zwierzęcia: ' + e.message,
      });
    } finally {
      isSaving = false;
    }
  }
</script>

<main>
  {#if !!animal}
    <UpdateHeader
      {updateAnimal}
      {isValid}
      {animal}
      {images}
      {isSaving}
      {prevCategory}
      bind:isPublic={animal.isPublic}
    />
    <AnimalForm
      bind:animal={animalData}
      bind:images
      setFormValid={(valid) => (isValid = valid)}
    />
  {:else}
    <Loader />
  {/if}
</main>
