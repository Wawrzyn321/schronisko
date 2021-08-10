<script lang="ts">
  import { Field, Input } from 'svelma';
  import ResizableImageInput from '../shared/ResizableImageInput.svelte';
  import ImagePreview from './ImagePreview.svelte';

  export let news: {
    title: string;
    description: string;
    imageName?: string;
  };
  export let imageData: string;
  export let setFormValid: (valid: boolean) => any;

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
      <Field label="Tytuł">
        <Input required bind:value={news.title} placeholder="Tytuł" />
      </Field>
      <Field label="Opis">
        <Input bind:value={news.description} placeholder="Opis" />
      </Field>
      <ResizableImageInput
        label="Tło"
        message="Widoczne na sliderze."
        bind:imageData
        width={515}
        height={345}
      />
    </div>
    <ImagePreview
      {imageData}
      {revertImage}
      imageName={news.imageName}
      width={515}
      height={345}
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
