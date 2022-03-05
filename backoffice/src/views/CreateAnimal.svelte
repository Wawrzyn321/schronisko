<script lang="ts">
  import {
    AnimalCategory,
    AnimalLocation,
    AnimalGender,
    AnimalType,
    VirtualCaretakerType,
  } from '.prisma/client';
  import { push } from 'svelte-spa-router';
  import CreateAnimalHeader from '../components/Animals/CreateAnimalHeader.svelte';
  import AnimalForm from '../components/Animals/Form/AnimalForm.svelte';
  import { animalsService } from '../services/AnimalsService';
  import type { AnimalData } from '../services/AnimalsService';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import type { AnimalImageParams } from './../services/AnimalImagesService';

  let isValid: boolean = false;
  let isCreating: boolean = false;
  let animalData: AnimalData = {
    id: '',
    name: '',
    category: AnimalCategory.DoAdopcji,
    gender: AnimalGender.NOT_SET,
    description: '',
    isPublic: true,
    location: AnimalLocation.Schronisko,
    type: AnimalType.CAT,
    virtualCaretakerName: null,
    virtualCaretakerType: VirtualCaretakerType.Szuka,
    imageData: '',
    contactInfo: '',
    locationDescription: null,
    refNo: 'b/n',
  };
  let images: AnimalImageParams[] = [];

  async function createAnimal() {
    try {
      isCreating = true;
      const { id } = await animalsService.create(animalData, images);
      push(`/animals/${id}`);
      notifySuccess({ message: 'Zwierzę zostało dodane.' });
    } catch (e) {
      if (e.status === 409) {
        notifyError({
          message:
            'Nie można dodać zwierzęcia: Podany identyfikator jest już zajęty.',
        });
      } else {
        notifyError({ message: 'Nie można dodać zwierzęcia: ' + e.message });
      }
    } finally {
      isCreating = false;
    }
  }
</script>

<main>
  <CreateAnimalHeader
    {createAnimal}
    {isValid}
    {images}
    {isCreating}
    {animalData}
    bind:isPublic={animalData.isPublic}
  />

  <AnimalForm
    bind:animal={animalData}
    bind:images
    setFormValid={(valid) => (isValid = valid)}
  />
</main>
