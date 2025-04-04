<script lang="ts">
  import { Button, Tooltip } from 'svelma';
  import {
    ChevronUpIcon,
    ChevronDownIcon,
    EyeIcon,
    EyeOffIcon,
  } from 'svelte-feather-icons';
  import { Trash2Icon } from 'svelte-feather-icons';

  import type { AnimalImageParams } from '../../services/AnimalImagesService';
  import ResizableImageInput from '../shared/ResizableImageInput.svelte';
  import { STATIC_URL } from '../../config';

  export let images: AnimalImageParams[];
  export let revalidateForm: () => void;
  export let disabled: boolean;

  const MAX_IMAGES = 8;

  const addImage = () => {
    for (const img of images) {
      img.order++;
    }
    images = [{ order: 0, data: '', visible: true }, ...images];
    revalidateForm();
  };

  const moveBack = (i: number) => {
    [images[i].order, images[i - 1].order] = [
      images[i - 1].order,
      images[i].order,
    ];
  };

  const moveFront = (i: number) => {
    [images[i].order, images[i + 1].order] = [
      images[i + 1].order,
      images[i].order,
    ];
  };

  const removeImage = (image: AnimalImageParams) => {
    images = images.filter((i) => i.order !== image.order);
    revalidateForm();
  };

  $: sortedImages = images?.sort((a, b) => a.order - b.order);
</script>

{#if images}
  <div class="g-flex-between-100">
    <p>
      Tutaj możesz dodać obrazy przedstawiające zwierzę. Powinny one mieć
      proporcje ~4/3.
      <br />
      Maksymalnie możesz dodać 8 zdjęć.
    </p>
    <Button
      on:click={addImage}
      disabled={images.length >= MAX_IMAGES || disabled}
      type="is-primary"
    >
      <strong style="margin-right: 0.5em" aria-label="Dodaj zdjęcie">+</strong> Dodaj
    </Button>
  </div>
  <ul class="animal-images-list">
    {#each sortedImages as image, i}
      <li>
        {#if image.data}
          <img class="image" src={image.data} alt="" />
        {:else if image.imageName}
          <img
            class="image"
            src={`${STATIC_URL}/animals/pics/${image.imageName}`}
            alt=""
          />
        {:else}
          <div class="image" />
        {/if}
        <ResizableImageInput
          bind:imageData={image.data}
          {revalidateForm}
          label=""
          width={1333}
          height={1000}
          {disabled}
        />
        <div class="actions">
          <div class="eye-tooltip">
            <Tooltip
              label="Określa czy zdjęcie jest widoczne na stronie głównej."
            >
              <Button
                type="is-primary"
                on:click={() => (image.visible = !image.visible)}
                {disabled}
              >
                {#if image.visible}
                  <EyeIcon size="1.0x" />
                {:else}
                  <EyeOffIcon size="1.0x" />
                {/if}
              </Button>
            </Tooltip>
          </div>

          <Button
            type="is-primary"
            on:click={() => moveBack(i)}
            disabled={i === 0 || disabled}
          >
            <ChevronUpIcon size="1.0x" />
          </Button>
          <Button
            type="is-primary"
            on:click={() => moveFront(i)}
            disabled={i === images.length - 1 || disabled}
          >
            <ChevronDownIcon size="1.0x" />
          </Button>
          <Button
            type="is-danger"
            on:click={() => removeImage(image)}
            {disabled}
          >
            <Trash2Icon size="1.0x" />
          </Button>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  .animal-images-list li {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .eye-tooltip {
    display: inline-block;
  }

  .image {
    height: 100px;
    width: 140px;
    display: block;
    border: 1px solid black;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
