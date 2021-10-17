<script lang="ts">
  import type { AnimalData } from '../../../services/AnimalsService';
  import ImagePreview from '../../News/ImagePreview.svelte';

  export let animal: AnimalData;
  export let revertImage: () => any;
  export let showOverlay: boolean = false;
</script>

<div class="preview-wrapper">
  <ImagePreview
    imageData={animal.imageData}
    {revertImage}
    imageName={animal.imageName}
    width={576}
    height={432}
  />
  {#if showOverlay}
    <img
      class="overlay"
      src="img/overlay.svg"
      style="height: 112px"
      alt="nakładka"
    />
  {/if}
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

    .overlay {
      left: 100%;
      margin-left: var(--padding);
    }
  }
</style>
