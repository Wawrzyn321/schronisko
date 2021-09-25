<script lang="ts">
  import Field from '../../shared/Field.svelte';
  import { Input, Tab, Tooltip } from 'svelma';
  import AnimalTypeSelect from './AnimalTypeSelect.svelte';
  import AnimalGenderSelect from './AnimalGenderSelect.svelte';
  import AnimalCategorySelect from './AnimalCategorySelect.svelte';
  import AnimalLocationSelect from './AnimalLocationSelect.svelte';
  import AnimalVirtualCaretakerSelect from './AnimalVirtualCaretakerSelect.svelte';
  import type { AnimalData } from '../../../services/AnimalsService';
  import { notifyInfo } from '../../../contexts/notification.context';
  import { AnimalCategory, VirtualCaretakerType } from '.prisma/client';
  import AnimalMiniatureForm from './AnimalMiniatureForm.svelte';

  export let animal: AnimalData;
  export let revalidateForm: () => any;

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

<Tab label="Dane">
  <div id="animal-data-form">
    <section class="top-left-form">
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
            bind:value={animal.refNo}
            placeholder="Numer ewidencyjny"
          />
        </Tooltip>
      </Field>
      <AnimalLocationSelect
        bind:location={animal.location}
        type={animal.type}
      />
      <Field required label="Dane kontaktowe">
        <Input
          bind:value={animal.contactInfo}
          placeholder="Np. osoba, numer telefonu, e-mail"
        />
      </Field>
      <AnimalVirtualCaretakerSelect
        bind:virtualCaretakerType={animal.virtualCaretakerType}
      />
    </section>
    <section>
      <div class="top-right-form">
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
            placeholder="Informacja gdzie przebywa zwierzę"
          />
        </Field>
      </div>
      <div id="v-caretaker-name">
        {#if animal.virtualCaretakerType === VirtualCaretakerType.Znalazl}
          <Field required label="Moim wirtualnym opiekunem jest">
            <Input required bind:value={animal.virtualCaretakerName} />
          </Field>
        {/if}
      </div>
    </section>
  </div>
  <AnimalMiniatureForm {revalidateForm} bind:animal />
</Tab>

<style lang="scss">
  @mixin grouped($cols) {
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: $cols;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-gap: 0;
    }
  }
  #animal-data-form {
    @include grouped(3fr 2fr);
  }

  .top-left-form {
    @include grouped(3fr 2fr);
  }

  .top-right-form {
    @include grouped(1fr 1fr);
  }

  :global(.tooltip-wrapper) {
    display: block !important;
  }

  #v-caretaker-name {
    margin-top: 12px;
  }
</style>
