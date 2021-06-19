<script lang="ts">
  import {
    AnimalCategory,
    AnimalLocation,
    AnimalGender,
    AnimalType,
    VirtualCaretakerType,
  } from '.prisma/client';
  import { Tab, Tabs } from 'svelma';
  import { push } from 'svelte-spa-router';
  import CreateAnimalHeader from '../components/Animals/CreateAnimalHeader.svelte';
  import AnimalForm from '../components/Animals/Form/AnimalForm.svelte';
  import { animalsService } from '../services/AnimalsService';
  import type { AnimalCreateParams } from '../services/AnimalsService';
import { notifyError, notifySuccess } from '../contexts/notification.context';

  let isValid: boolean = false;
  let animal: AnimalCreateParams = {
    name: '',
    category: AnimalCategory.DoAdopcji,
    gender: AnimalGender.FEMALE,
    description: '',
    isPublic: true,
    location: AnimalLocation.Schronisko,
    type: AnimalType.CAT,
    virtualCaretakerName: null,
    virtualCaretakerType: VirtualCaretakerType.Szuka,
  };

  async function createAnimal() {
    try {
      const { id } = await animalsService.create(animal);
      push(`/animal/${id}`);
      notifySuccess({message: 'Zwierzę zostało dodane'})
    } catch (e) {
      notifyError({message: 'Nie można dodać zwierzęcia: ' + e.message})
    }
  }
</script>

<main>
  <CreateAnimalHeader
    {createAnimal}
    {isValid}
    bind:isPublic={animal.isPublic}
  />

  <Tabs>
    <Tab label="Dane">
      <AnimalForm bind:animal setFormValid={(valid) => (isValid = valid)} />
    </Tab>
    <Tab label="Zdjęcia">zdj</Tab>
  </Tabs>
</main>
