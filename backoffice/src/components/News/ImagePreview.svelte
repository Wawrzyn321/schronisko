<script lang="ts">
  import { API_URL } from '../../services/config';
  import { Trash2Icon, RotateCcwIcon } from 'svelte-feather-icons';

  export let imageData: string | null;
  export let imageName: string | null;
  export let revertImage: () => any;
</script>

<div class="image-preview">
  {#if imageData}
    <img src={imageData} alt="Podgląd" />
  {:else if imageName}
    <img src={`${API_URL}/${imageName}`} alt="Podgląd" />
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
    width: 515px;
    height: 345px;
    margin-left: 32px;

    & > * {
      width: 515px;
      height: 345px;
      position: absolute;
    }
  }
  img {
    max-width: unset;
    display: block;
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

  .overlay_button {
    border: none;
    background: rgba(255, 255, 255, 0.5);

    &:first-of-type {
        margin-right: 10px;
    }
  }
</style>
