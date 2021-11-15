<script lang="ts">
  import AnimalImagePreview from './AnimalImagePreview.svelte';
  import ResizableImageInput from '../../shared/ResizableImageInput.svelte';
  import { Tooltip } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import { AnimalType } from '.prisma/client';

  export let animal: AnimalData;
  export let revalidateForm: () => any;

  function revertImage() {
    animal.imageData = null;
  }
</script>

<div class="animal-miniature-form">
  <Tooltip label="Widoczna na obu stronach.">
    <ResizableImageInput
      label="Miniaturka"
      bind:imageData={animal.imageData}
      bind:imageName={animal.imageName}
      {revalidateForm}
      width={152}
      height={112}
      required={false}
    />
  </Tooltip>
  <AnimalImagePreview
    {animal}
    {revertImage}
    animalType={animal.type}
  />
</div>

<style lang="scss">
  .animal-miniature-form {
    margin-top: 64px;
    margin-bottom: 64px;
    display: flex;
    justify-content: space-between;
  }
</style>
