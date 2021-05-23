<script lang="ts">
  import { Field, Input } from 'svelma';
  import ImageResizeModal from '../ImageResizeModal/ImageResizeModal.svelte';

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

  async function onFileChange(e: any) {
    if (!e.target) return;
    file = e.target.files[0];
    resizeModalVisible = true;
    e.target.files = null;
    e.target.value = null;
  }
</script>

<form bind:this={form} on:input={setFormValid(form.checkValidity())}>
  <div>
    <div style="width: 100%">
      <Field label="Tytuł">
        <Input required bind:value={news.title} placeholder="Tytuł" />
      </Field>
      <Field label="Opis">
        <Input bind:value={news.description} placeholder="Opis" />
      </Field>
      <Field label="Tło" message="Widoczne na sliderze.">
        <Input type="file" on:input={onFileChange} />
      </Field>
    </div>
    <div>
      <!-- <canvas bind:this={previewCanvas} width="515" height="345" /> -->
      {#if imageData}
        <img src={imageData} alt="Podgląd" />
      {:else if news.imageName}
        <img src={`http://localhost:3000/${news.imageName}`} alt="Podgląd" />
      {/if}
    </div>
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

    img {
      width: 515px;
      height: 345px;
      max-width: unset;
      display: block;
      margin-left: 32px;
    }
    @media (max-width: 800px) {
      & > div {
        display: block;
      }

      img {
        margin: 16px auto 0;
      }

    :global(input) {
      max-width: 75vw;
    }

    }
  }
</style>
