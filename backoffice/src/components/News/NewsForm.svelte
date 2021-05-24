<script lang="ts">
  import { Button, Field, Input } from 'svelma';
  import ImageResizeModal from '../ImageResizeModal/ImageResizeModal.svelte';
  import ImagePreview from './ImagePreview.svelte';

  interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  export let news: {
    title: string;
    description: string;
    imageName?: string;
  };
  export let imageData: string;
  export let setFormValid: (valid: boolean) => any;

  let form: HTMLFormElement;
  let resizeModalVisible = false;
  let file: File;

  $: imageData && revalidateForm();

  async function onFileChange(e: HtmlInputEvent) {
    if (!e.target) return;
    file = e.target.files[0];
    openResizeModal();
  }

  function openResizeModal() {
    resizeModalVisible = true;
  }

  function revertImage() {
    imageData = null;
  }

  function revalidateForm() {
    setFormValid(form.checkValidity() && (!!imageData || !!news.imageName));
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
      <Field label="Tło" message="Widoczne na sliderze.">
        <div style="display: flex">
          <Input type="file" on:input={onFileChange} />
          <Button on:click={openResizeModal} disabled={!file}>Przytnij</Button>
        </div>
      </Field>
    </div>
    <ImagePreview {imageData} {revertImage} imageName={news.imageName} />
  </div>
</form>
<ImageResizeModal
  {file}
  setImageData={(data) => (imageData = data)}
  bind:modalVisible={resizeModalVisible}
/>

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
