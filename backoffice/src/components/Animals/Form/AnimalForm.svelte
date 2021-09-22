<script lang="ts">
  import Field from '../../shared/Field.svelte';
  import { Input, Tab, Tooltip, Button } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import AnimalTypeSelect from './AnimalTypeSelect.svelte';
  import AnimalGenderSelect from './AnimalGenderSelect.svelte';
  import AnimalCategorySelect from './AnimalCategorySelect.svelte';
  import AnimalLocationSelect from './AnimalLocationSelect.svelte';
  import VirtualCaretakerControl from './VirtualCaretakerControl.svelte';
  import AnimalImages from './../AnimalImages.svelte';
  import { AnimalCategory, VirtualCaretakerType } from '.prisma/client';
  import AnimalImagePreview from './AnimalImagePreview.svelte';
  import ResizableImageInput from '../../shared/ResizableImageInput.svelte';
  import type { AnimalImageParams } from '../../../services/AnimalImagesService';
  import { descriptionTemplates } from './descriptionTemplates';
  import { notifyInfo } from '../../../contexts/notification.context';
  import { querystring } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import Tabs from '../../shared/Tabs.svelte';

  export let animal: AnimalData;
  export let images: AnimalImageParams[] = [];
  export let isUpdate = false;
  export let setFormValid: (valid: boolean) => any;

  const mode = new URLSearchParams(get(querystring)).get('mode');

  let form: HTMLFormElement;

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

  function onCategoryChange(category: AnimalCategory) {
    if (category === AnimalCategory.ZaTeczowymMostem) {
      animal.virtualCaretakerType = VirtualCaretakerType.NiePrzypisany;
      notifyInfo({ message: 'Zmieniono rodzaj wirtualnego opiekuna.' });
    } else if (
      category === AnimalCategory.ZnalazlyDom &&
      animal.virtualCaretakerType === VirtualCaretakerType.Szuka
    ) {
      animal.virtualCaretakerType = VirtualCaretakerType.NiePrzypisany;
      notifyInfo({ message: 'Zmieniono rodzaj wirtualnego opiekuna.' });
    }
  }
</script>

<form bind:this={form} on:input={revalidateForm} on:change={revalidateForm}>
  <Tabs mapping={['data', 'photos']} currentTab={mode}>
    <Tab label="Dane">
      <div id="top-form">
        <section id="top-left-form">
          <Field label="Imię" required>
            <Input
              required
              bind:value={animal.name}
              placeholder="Imię zwierzęcia"
            />
          </Field>
          <AnimalTypeSelect bind:type={animal.type} />
          <Field label="Numer ewidencyjny" required>
            <Tooltip label="Musi być unikalny.">
              <Input
                required
                bind:value={animal.id}
                placeholder="Numer ewidencyjny"
                disabled={isUpdate}
              />
            </Tooltip>
          </Field>
          <AnimalLocationSelect
            bind:location={animal.location}
            type={animal.type}
          />
        </section>
        <section>
          <div id="top-right-form">
            <AnimalGenderSelect bind:gender={animal.gender} />
            <AnimalCategorySelect
              bind:category={animal.category}
              virtualCaretakerType={animal.virtualCaretakerType}
              onChange={onCategoryChange}
            />
          </div>
          <div>
            <Field label="Dodatkowy opis miejsca">
              <Input
                bind:value={animal.locationDescription}
                placeholder="Dodatkowy opis"
              />
            </Field>
          </div>
        </section>
      </div>
      <div>
        <div class="flex-between">
          <Field label="Opis" required />
          {#if descriptionTemplates[animal.category] && descriptionTemplates[animal.category][animal.gender]}
            <Button
              type="is-primary"
              on:click={() =>
                (animal.description =
                  descriptionTemplates[animal.category][animal.gender])}
            >
              Użyj szablonu
            </Button>
          {:else}
            <Tooltip
              position="is-left"
              label={'Tylko kategorie "Do adopcji" oraz "Niedawno znalezione" posiadają szablony.'}
            >
              <Button type="is-primary" disabled>Użyj szablonu</Button>
            </Tooltip>
          {/if}
        </div>
        <Tooltip label="Opis widoczny na stronie.">
          <Input
            required
            maxlength="1500"
            bind:value={animal.description}
            type="textarea"
            placeholder="Opis zwierzęcia"
          />
        </Tooltip>
        <Field label="Notatka">
          <Tooltip
            label="Notatka dla pracowników, niewidoczna na stronie głównej."
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
            <Tooltip label="Widoczna na obu stronach.">
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
      </div>
    </Tab>
    <Tab label="Zdjęcia"><AnimalImages bind:images {revalidateForm} /></Tab>
  </Tabs>
</form>

<style lang="scss">
  form {
    margin-top: 16px;
    margin-bottom: 16px;

    .flex-between {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      align-items: flex-end;
    }

    @mixin grouped($cols) {
      display: grid;
      grid-column-gap: 32px;
      grid-template-columns: $cols;

      @media (max-width: 800px) {
        grid-template-columns: 1fr;
        grid-gap: 0;
      }
    }
    #top-form {
      @include grouped(3fr 2fr);
    }

    #top-left-form {
      @include grouped(3fr 2fr);
    }

    #top-right-form {
      @include grouped(1fr 1fr);
    }

    :global(.tooltip-wrapper) {
      display: block;
    }
  }
</style>
