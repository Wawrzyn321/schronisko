<script lang="ts">
  import { Field, Input, Tab, Tabs } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import AnimalTypeSelect from './AnimalTypeSelect.svelte';
  import AnimalGenderSelect from './AnimalGenderSelect.svelte';
  import AnimalCategorySelect from './AnimalCategorySelect.svelte';
  import AnimalLocationSelect from './AnimalLocationSelect.svelte';
  import VirtualCaretakerControl from './VirtualCaretakerControl.svelte';
  import AnimalImages from './../AnimalImages.svelte';
  import { VirtualCaretakerType } from '.prisma/client';
  import ImagePreview from '../../News/ImagePreview.svelte';
  import ResizableImageInput from '../../ResizableImageInput.svelte';
  import type { AnimalImageParams } from '../../../services/AnimalImagesService';

  export let animal: AnimalData;
  export let images: AnimalImageParams[];
  export let isUpdate = false;
  export let setFormValid: (valid: boolean) => any;

  let form: HTMLFormElement;

  function revertImage() {
    animal.imageData = null;
  }

  function revalidateForm() {
    const isVirtualCaretakerValid =
      !!animal.virtualCaretakerName ||
      animal.virtualCaretakerType !== VirtualCaretakerType.Znalazl;
    const imageValid = !!animal.imageData || !!animal.imageName;
    const imagesValid = images.every((image) => !!image.data);

    setFormValid(
      form.checkValidity() &&
        isVirtualCaretakerValid &&
        !!imageValid &&
        imagesValid
    );
  }
</script>

<form bind:this={form} on:input={revalidateForm} on:change={revalidateForm}>
  <Tabs>
    <Tab label="Dane">
      <div id="first-row">
        <Field label="Imię">
          <Input
            required
            bind:value={animal.name}
            placeholder="Imię zwierzęcia"
          />
        </Field>
        <AnimalTypeSelect bind:type={animal.type} />
        <AnimalGenderSelect bind:gender={animal.gender} />
      </div>
      <div id="second-row">
        <Field label="Numer ewidencyjny">
          <Input
            required
            bind:value={animal.id}
            placeholder="Numer ewidencyjny"
            disabled={isUpdate}
          />
        </Field>

        <AnimalCategorySelect
          bind:category={animal.category}
          virtualCaretakerType={animal.virtualCaretakerType}
        />
        <AnimalLocationSelect
          bind:location={animal.location}
          type={animal.type}
        />
      </div>
      <Field label="Opis">
        <Input
          required
          bind:value={animal.description}
          type="textarea"
          placeholder="Opis zwierzęcia"
        />
      </Field>
      <div class="g-flex-between-100">
        <div style="margin-right: 24px">
          <ResizableImageInput
            label="Miniaturka"
            bind:imageData={animal.imageData}
            {revalidateForm}
            width={152}
            height={112}
          />
          <ImagePreview
            imageData={animal.imageData}
            {revertImage}
            imageName={animal.imageName}
            width={152}
            height={112}
          />
        </div>
        <div>
          <VirtualCaretakerControl
            bind:virtualCaretakerName={animal.virtualCaretakerName}
            bind:virtualCaretakerType={animal.virtualCaretakerType}
          />
        </div>
      </div>
    </Tab>
    <Tab label="Zdjęcia"><AnimalImages bind:images {revalidateForm} /></Tab>
  </Tabs>
</form>

<style lang="scss">
  form {
    margin-top: 16px;
    margin-bottom: 16px;

    @mixin grouped($cols) {
      display: grid;
      grid-gap: 32px;
      grid-template-columns: $cols;

      @media (max-width: 800px) {
        grid-template-columns: 1fr;
        grid-gap: 0;
      }
    }

    :global(#first-row) {
      @include grouped(2fr 1fr 1fr);
    }
    :global(#second-row) {
      @include grouped(2fr 1fr 1fr);
    }
  }
</style>
