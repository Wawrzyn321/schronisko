<script lang="ts">
  import { AnimalType } from '@prisma-app/client';

  import type { AnimalFormData } from '../../../services/AnimalsService';
  import ImagePreview from '../../News/ImagePreview.svelte';

  export let animal: AnimalFormData;
  export let revertImage: () => void;
  export let animalType: AnimalType;
</script>

<div class="preview-wrapper">
  <ImagePreview
    subdir="/animals/"
    imageData={animal.imageData}
    {revertImage}
    imageName={animal.imageName}
    width={576}
    height={432}
    placeholderPic={`/img/placeholders/${
      animalType === AnimalType.DOG ? 'pies' : 'kot'
    }.png`}
  />
</div>

<style lang="scss">
  .preview-wrapper {
    --padding: 32px;
    position: relative;
    height: 432px;
    width: calc(576px + var(--padding));

    & > :global(*) {
      position: absolute;
      left: 0;
    }
  }
</style>
