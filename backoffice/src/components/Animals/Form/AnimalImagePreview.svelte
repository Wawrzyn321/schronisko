<script lang="ts">
  import type { AnimalData } from '../../../services/AnimalsService';
  import ImagePreview from '../../News/ImagePreview.svelte';

  export let animal: AnimalData;
  export let revertImage: () => any;

  let showOverlay = false;
</script>

<div class="preview-wrapper">
  <ImagePreview
    imageData={animal.imageData}
    {revertImage}
    imageName={animal.imageName}
    width={152}
    height={112}
  />
  {#if showOverlay}
    <img src="img/overlay.svg" style="height: 112px" alt="nakładka" />
  {/if}
</div>
<label>
  <input
    checked={showOverlay}
    type="checkbox"
    on:change={() => (showOverlay = !showOverlay)}
  />
  Podgląd nakładki
</label>

<style lang="scss">
  .preview-wrapper {
    position: relative;
    height: 115px;

    & > :global(*) {
      position: absolute;
      left: 0;
      margin-left: 32px;
    }
  }
</style>
