<script lang="ts">
  import { Tab } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import AnimalImages from './../AnimalImages.svelte';
  import type { AnimalImageParams } from '../../../services/AnimalImagesService';
  import { querystring } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import Tabs from '../../shared/Tabs.svelte';
  import DescriptionTab from './DescriptionTab.svelte';
  import DataTab from './DataTab.svelte';
  import { isReadonly } from './animal-readonly';

  export let animal: AnimalData;
  export let images: AnimalImageParams[] = [];
  export let setFormValid: (valid: boolean) => any;

  const mode = new URLSearchParams(get(querystring)).get('mode');

  let form: HTMLFormElement;

  function revalidateForm() {
    const imagesValid =
      isReadonly(animal.category) ||
      images.every((image) => !!image.data || !!image.imageName);

    setFormValid(form.checkValidity() && imagesValid);
  }
</script>

<form bind:this={form} on:input={revalidateForm} on:change={revalidateForm}>
  <Tabs mapping={['data', 'description', 'photos']} currentTab={mode}>
    <DataTab bind:animal {revalidateForm} />
    <DescriptionTab
      bind:animal
      {revalidateForm}
      isReadonly={isReadonly(animal.category)}
    />
    <Tab label="Zdjęcia">
      {#if isReadonly(animal.category)}
        Nie można dodać zdjęć do zwierząt w tej kategorii.
      {:else}
        <AnimalImages bind:images {revalidateForm} />
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
