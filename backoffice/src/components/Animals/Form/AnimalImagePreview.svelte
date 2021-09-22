<script lang="ts">
  import type { AnimalData } from '../../../services/AnimalsService';
  import ImagePreview from '../../News/ImagePreview.svelte';

  export let animal: AnimalData;
  export let revertImage: () => any;

  let showOverlay = false;
</script>

<label>
  <input
    checked={showOverlay}
    type="checkbox"
    on:change={() => (showOverlay = !showOverlay)}
  />
  Podgląd nakładki
</label>
<div class="preview-wrapper">
  <ImagePreview
    imageData={animal.imageData}
    {revertImage}
    imageName={animal.imageName}
    width={152}
    height={112}
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
    height: 115px;
    width: calc(152px + var(--padding));

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
