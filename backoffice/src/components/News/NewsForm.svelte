<script lang="ts">
  import Field from './../shared/Field.svelte';
  import { Input } from 'svelma';
  import ResizableImageInput from '../shared/ResizableImageInput.svelte';
  import ImagePreview from './ImagePreview.svelte';

  export let news: {
    title: string;
    description: string;
    imageName?: string;
  };
  export let imageData: string;
  export let setFormValid: (valid: boolean) => void;

  let form: HTMLFormElement;

  $: imageData && revalidateForm();

  function revalidateForm() {
    setFormValid(form.checkValidity() && (!!imageData || !!news.imageName));
  }

  function revertImage() {
    imageData = null;
  }
</script>

<form bind:this={form} on:input={revalidateForm}>
  <div>
    <div>
      <Field label="Tytuł" required>
        <Input required bind:value={news.title} placeholder="Tytuł" pattern=".*\S+.*" />
      </Field>
      <Field label="Opis">
        <Input bind:value={news.description} placeholder="Opis" pattern=".*\S+.*" />
      </Field>
      <ResizableImageInput
        label="Tło"
        message="Widoczne na sliderze."
        bind:imageData
        width={1000}
        height={670}
      />
    </div>
    <ImagePreview
      {imageData}
      {revertImage}
      imageName={news.imageName}
      width={500}
      height={335}
      subdir="news/"
      placeholderPic=""
    />
  </div>
</form>

<style lang="scss">
  form {
    margin-top: 16px;
    margin-bottom: 16px;

    :global(input) {
      max-width: 50vw;
    }

    & > div {
      display: flex;
      justify-content: space-between;
    }

    @media (max-width: 800px) {
      & > div {
        display: block;
      }

      :global(input) {
        max-width: 75vw;
      }
    }
  }
</style>
