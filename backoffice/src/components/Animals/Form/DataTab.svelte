<script lang="ts">
  import Field from '../../shared/Field.svelte';
  import { Input, Tab } from 'svelma';
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
  export let disabled: boolean;

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
    <Field label="Imię" required style="grid-area: name">
      <Input
        required
        bind:value={animal.name}
        placeholder="Imię zwierzęcia"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    <AnimalTypeSelect bind:type={animal.type} {disabled} />
    <Field label="Numer ewidencyjny" required style="grid-area: ref">
      <Input
        required
        bind:value={animal.refNo}
        placeholder="Numer ewidencyjny"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    <AnimalLocationSelect
      bind:location={animal.location}
      type={animal.type}
      {disabled}
    />
    <Field required label="Dane kontaktowe" style="grid-area: contact">
      <Input
        required
        bind:value={animal.contactInfo}
        placeholder="Np. osoba, numer telefonu, e-mail"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    <AnimalVirtualCaretakerSelect
      bind:virtualCaretakerType={animal.virtualCaretakerType}
      {disabled}
    />
    <AnimalGenderSelect bind:gender={animal.gender} {disabled} />
    <AnimalCategorySelect
      bind:category={animal.category}
      virtualCaretakerType={animal.virtualCaretakerType}
      onChange={onCategoryChange}
      {disabled}
    />
    <Field label="Dodatkowy opis miejsca" style="grid-area: location-desc">
      <Input
        bind:value={animal.locationDescription}
        placeholder="Informacja gdzie przebywa zwierzę"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    {#if animal.virtualCaretakerType === VirtualCaretakerType.Znalazl}
      <Field label="Moim wirtualnym opiekunem jest" style="grid-area: v-c-name">
        <Input
          bind:value={animal.virtualCaretakerName}
          pattern=".*\S+.*"
          {disabled}
        />
      </Field>
    {/if}
  </div>
  <AnimalMiniatureForm {revalidateForm} bind:animal {disabled}/>
</Tab>

<style lang="scss">
  #animal-data-form {
    display: grid;
    column-gap: 32px;
    grid-template-areas:
      'name type gender category'
      'ref 	location location-desc location-desc'
      'contact v-c-type	v-c-name v-c-name';
  }

  :global(.tooltip-wrapper) {
    display: block !important;
  }
</style>
