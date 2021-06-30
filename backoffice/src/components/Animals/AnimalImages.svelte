<script lang="ts">
  import { Button } from 'svelma';
  import {
    ChevronUpIcon,
    ChevronDownIcon,
    EyeIcon,
    EyeOffIcon,
  } from 'svelte-feather-icons';
  import { Trash2Icon } from 'svelte-feather-icons';

  import type { AnimalImageParams } from '../../services/AnimalImagesService';
  import { API_URL } from '../../services/config';
  import ResizableImageInput from './../ResizableImageInput.svelte';

  export let images: AnimalImageParams[];
  export let revalidateForm: () => any;

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
      proporcje 708x533.
      <br />
      Maksymalnie możesz dodać 8 zdjęć.
    </p>
    <Button
      on:click={addImage}
      disabled={images.length >= MAX_IMAGES}
      type="is-primary"
    >
      <strong>+</strong>
    </Button>
  </div>
  <ul class="animal-images-list">
    {#each sortedImages as image, i}
      <li>
        {#if image.data}
          <img class="image" src={image.data} alt="" />
        {:else if image.imageName}
          <img class="image" src={`${API_URL}/${image.imageName}`} alt="" />
        {:else}
          <div class="image" />
        {/if}
        <ResizableImageInput
          bind:imageData={image.data}
          {revalidateForm}
          label=""
          width={708}
          height={533}
        />
        <div>
          <Button
            type="is-primary"
            on:click={() => (image.visible = !image.visible)}
          >
            {#if image.visible}
              <EyeIcon size="1.0x" />
            {:else}
              <EyeOffIcon size="1.0x" />
            {/if}
          </Button>

          <Button
            type="is-primary"
            on:click={() => moveBack(i)}
            disabled={i === 0}
          >
            <ChevronUpIcon size="1.0x" />
          </Button>
          <Button
            type="is-primary"
            on:click={() => moveFront(i)}
            disabled={i === images.length - 1}
          >
            <ChevronDownIcon size="1.0x" />
          </Button>
          <Button type="is-danger" on:click={() => removeImage(image)}>
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

  .image {
    height: 100px;
    width: 140px;
    display: block;
    border: 1px solid black;
  }
</style>
