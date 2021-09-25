<script lang="ts">
  import AnimalImagePreview from './AnimalImagePreview.svelte';
  import ResizableImageInput from '../../shared/ResizableImageInput.svelte';
  import { Tooltip } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';

  export let animal: AnimalData;
  export let revalidateForm: () => any;

  let showOverlay = false;

  function revertImage() {
    animal.imageData = null;
  }
</script>

<div class="animal-miniature-form">
  <Tooltip label="Widoczna na obu stronach.">
    <ResizableImageInput
      label="Miniaturka"
      bind:imageData={animal.imageData}
      {revalidateForm}
      width={152}
      height={112}
    />
  </Tooltip>
  <!-- <label style="margin-top: 10px">
      <input
        checked={showOverlay}
        type="checkbox"
        on:change={() => (showOverlay = !showOverlay)}
      />
      Podgląd nakładki
    </label>
  </div> -->
  <AnimalImagePreview {animal} {revertImage} {showOverlay} />
</div>

<style lang="scss">
  .animal-miniature-form {
    margin-top: 64px;
    margin-bottom: 64px;
    display: flex;
    justify-content: space-between;
  }
</style>
