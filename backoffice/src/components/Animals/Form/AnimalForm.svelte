<script lang="ts">
  import { Tab } from 'svelma';
  import type { AnimalFormData } from '../../../services/AnimalsService';
  import AnimalImages from './../AnimalImages.svelte';
  import type { AnimalImageParams } from '../../../services/AnimalImagesService';
  import { querystring } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import Tabs from '../../shared/Tabs.svelte';
  import DescriptionTab from './DescriptionTab.svelte';
  import DataTab from './DataTab.svelte';
  import { isReadonly } from './animal-readonly';
  import { auth } from '../../../contexts/auth.context';
  import { Permission } from '@prisma-app/client';

  export let animalFormData: AnimalFormData;
  export let images: AnimalImageParams[] = [];
  export let setFormValid: (valid: boolean) => void;

  const mode = new URLSearchParams(get(querystring)).get('mode') ?? 'data';
  const canEditAnimals = $auth?.user.permissions.includes(Permission.ANIMAL);

  let form: HTMLFormElement;

  function revalidateForm() {
    const imagesValid =
      isReadonly(animalFormData.category) ||
      images.every((image) => !!image.data || !!image.imageName);

    setFormValid(form.checkValidity() && imagesValid);
  }
</script>

<form bind:this={form} on:input={revalidateForm} on:change={revalidateForm}>
  <Tabs mapping={['data', 'description', 'photos']} currentTab={mode}>
    <DataTab bind:animalFormData {revalidateForm} disabled={!canEditAnimals} />
    <DescriptionTab
      bind:animalFormData
      {revalidateForm}
      isReadonly={isReadonly(animalFormData.category)}
      disabled={!canEditAnimals}
    />
    <Tab label="Zdjęcia">
      {#if isReadonly(animalFormData.category)}
        Nie można dodać zdjęć do zwierząt w tej kategorii.
      {:else}
        <AnimalImages bind:images {revalidateForm} disabled={!canEditAnimals} />
      {/if}
    </Tab>
  </Tabs>
</form>

<style lang="scss">
  form {
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
