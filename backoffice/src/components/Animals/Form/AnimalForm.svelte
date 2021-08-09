<script lang="ts">
  import { Field, Input, Tab, Tabs, Tooltip } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import AnimalTypeSelect from './AnimalTypeSelect.svelte';
  import AnimalGenderSelect from './AnimalGenderSelect.svelte';
  import AnimalCategorySelect from './AnimalCategorySelect.svelte';
  import AnimalLocationSelect from './AnimalLocationSelect.svelte';
  import VirtualCaretakerControl from './VirtualCaretakerControl.svelte';
  import AnimalImages from './../AnimalImages.svelte';
  import { VirtualCaretakerType } from '.prisma/client';
  import AnimalImagePreview from './AnimalImagePreview.svelte';
  import ResizableImageInput from '../../ResizableImageInput.svelte';
  import type { AnimalImageParams } from '../../../services/AnimalImagesService';
  import { onMount } from 'svelte';

  export let animal: AnimalData;
  export let images: AnimalImageParams[] = [];
  export let isUpdate = false;
  export let setFormValid: (valid: boolean) => any;

  let form: HTMLFormElement;
  let tabs: any;

  function revertImage() {
    animal.imageData = null;
  }

  function revalidateForm() {
    const isVirtualCaretakerValid =
      !!animal.virtualCaretakerName ||
      animal.virtualCaretakerType !== VirtualCaretakerType.Znalazl;
    const imageValid = !!animal.imageData || !!animal.imageName;
    const imagesValid = images.every(
      (image) => !!image.data || !!image.imageName
    );

    setFormValid(
      form.checkValidity() &&
        isVirtualCaretakerValid &&
        !!imageValid &&
        imagesValid
    );
  }

  onMount(() => tabs.setActive(0));
</script>

<form bind:this={form} on:input={revalidateForm} on:change={revalidateForm}>
  <Tabs bind:this={tabs}>
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
          <Tooltip label="Musi być unikalny.">
            <Input
              required
              bind:value={animal.id}
              placeholder="Numer ewidencyjny"
              disabled={isUpdate}
            />
          </Tooltip>
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
        <Tooltip label="Opis widoczny na stronie">
          <Input
            required
            maxlength="1500"
            bind:value={animal.description}
            type="textarea"
            placeholder="Opis zwierzęcia"
          />
        </Tooltip>
      </Field>
      <Field label="Notatka">
        <Tooltip
          label="Notatka dla pracowników, niewidoczna na stronie głównej"
        >
          <Input
            maxlength="200"
            bind:value={animal.note}
            type="textarea"
            placeholder="Notatka"
          />
        </Tooltip>
      </Field>
      <div class="g-flex-between-100">
        <div style="margin-right: 24px">
          <Tooltip label="Widoczna na obu stronach">
            <ResizableImageInput
              label="Miniaturka"
              bind:imageData={animal.imageData}
              {revalidateForm}
              width={152}
              height={112}
            />
          </Tooltip>
          <AnimalImagePreview {animal} {revertImage} />
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

    :global(.tooltip-wrapper) {
      display: block;
    }
  }
</style>
