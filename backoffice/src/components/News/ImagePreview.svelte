<script lang="ts">
  import { STATIC_URL } from '../../services/config';
  import { RotateCcwIcon } from 'svelte-feather-icons';

  export let width: number;
  export let height: number;
  export let imageData: string | null;
  export let imageName: string | null;
  export let subdir = '';
  export let revertImage: () => any;
  export let placeholderPic: string | null;
</script>

<div
  class="image-preview"
  style={`--width: ${width}px; --height: ${height}px;`}
>
  {#if imageData}
    <img src={imageData} alt="Podgląd" />
  {:else if imageName}
    <img src={`${STATIC_URL}/${subdir}${imageName}`} alt="Podgląd" />
  {:else if placeholderPic}
    <img src={placeholderPic} alt="Podgląd" />
  {/if}
  {#if imageData && imageName}
    <div class="image-preview__overlay">
      <button class="overlay-button" on:click|preventDefault={revertImage}>
        <RotateCcwIcon size="2.0x" />
      </button>
    </div>
  {/if}
</div>

<style lang="scss">
  .image-preview {
    width: var(--width);
    height: var(--height);
    margin-left: 32px;
    border: 1px solid black;

    & > * {
      width: var(--width);
      height: var(--height);
      position: absolute;
    }
  }
  img {
    max-width: unset;
    display: block;
    border: 1px solid black;
  }

  @media (max-width: 800px) {
    img {
      margin: 16px auto 0;
    }
  }

  .image-preview__overlay {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 10px;
  }
</style>
