<script lang="ts">
  import { onMount } from 'svelte';
  import Loader from '../components/Loader.svelte';
  import AnimalForm from '../components/Animals/Form/AnimalForm.svelte';
  import UpdateHeader from '../components/Animals/UpdateHeader.svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import { animalsService } from '../services/AnimalsService';
  import { animalImagesService } from '../services/AnimalImagesService';
  import type { AnimalImageParams } from '../services/AnimalImagesService';
  import type { Animal } from '.prisma/client';
  import type { AnimalData } from '../services/AnimalsService';

  export let params: { id: string };

  let animal: Animal;
  let animalData: AnimalData;
  let images: AnimalImageParams[];
  let isValid: boolean = true;

  onMount(async () => {
    try {
      animal = await animalsService.get(params.id);
      animalData = animal as AnimalData;
      images = await animalImagesService.get(params.id);
      console.log(images);
    } catch (e) {
      notifyError({
        message: 'Nie można pobrać danych zwierzęcia: ' + e.message,
      });
    }
  });

  async function updateAnimal() {
    try {
      await animalsService.update(animal, images);
      notifySuccess({ message: 'Dane zwierzęcia zostały zapisane' });
    } catch (e) {
      notifyError({
        message: 'Nie możnac zapisać danych zwierzęcia : ' + e.message,
      });
    }
  }
</script>

<main>
  {#if !!animal}
    <UpdateHeader
      timestamp={animal.addedDate}
      {updateAnimal}
      {isValid}
      {animal}
      bind:isPublic={animal.isPublic}
    />
    <AnimalForm
      bind:animal={animalData}
      bind:images
      isUpdate={true}
      setFormValid={(valid) => (isValid = valid)}
    />
  {:else}
    <Loader />
  {/if}
</main>
