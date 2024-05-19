<script lang="ts">
  import Field from '../../shared/Field.svelte';
  import { Input, Tab } from 'svelma';
  import AnimalTypeSelect from './AnimalTypeSelect.svelte';
  import AnimalGenderSelect from './AnimalGenderSelect.svelte';
  import AnimalCategorySelect from './AnimalCategorySelect.svelte';
  import AnimalLocationSelect from './AnimalLocationSelect.svelte';
  import AnimalVirtualCaretakerSelect from './AnimalVirtualCaretakerSelect.svelte';
  import type { AnimalFormData } from '../../../services/AnimalsService';
  import { notifyInfo } from '../../../contexts/notification.context';
  import { AnimalCategory, VirtualCaretakerType } from '@prisma-app/client';
  import AnimalMiniatureForm from './AnimalMiniatureForm.svelte';

  export let animalFormData: AnimalFormData;
  export let revalidateForm: () => void;
  export let disabled: boolean;

  function onCategoryChange(category: AnimalCategory) {
    if (category === AnimalCategory.ZaTeczowymMostem) {
      animalFormData.virtualCaretakerType = VirtualCaretakerType.NiePrzypisany;
      notifyInfo({ message: 'Zmieniono rodzaj wirtualnego opiekuna.' });
    } else if (
      category === AnimalCategory.ZnalazlyDom &&
      animalFormData.virtualCaretakerType === VirtualCaretakerType.Szuka
    ) {
      animalFormData.virtualCaretakerType = VirtualCaretakerType.NiePrzypisany;
      notifyInfo({ message: 'Zmieniono rodzaj wirtualnego opiekuna.' });
    }
  }
</script>

<Tab label="Dane">
  <div id="animal-data-form">
    <Field label="Imię" required style="grid-area: name">
      <Input
        required
        bind:value={animalFormData.name}
        placeholder="Imię zwierzęcia"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    <AnimalTypeSelect bind:type={animalFormData.type} {disabled} />
    <Field label="Numer ewidencyjny" required style="grid-area: ref">
      <Input
        required
        bind:value={animalFormData.refNo}
        placeholder="Numer ewidencyjny"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    <AnimalLocationSelect
      bind:location={animalFormData.location}
      type={animalFormData.type}
      {disabled}
    />
    <Field required label="Dane kontaktowe" style="grid-area: contact">
      <Input
        required
        bind:value={animalFormData.contactInfo}
        placeholder="Np. osoba, numer telefonu, e-mail"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    <AnimalVirtualCaretakerSelect
      bind:virtualCaretakerType={animalFormData.virtualCaretakerType}
      {disabled}
    />
    <AnimalGenderSelect bind:gender={animalFormData.gender} {disabled} />
    <AnimalCategorySelect
      bind:category={animalFormData.category}
      virtualCaretakerType={animalFormData.virtualCaretakerType}
      onChange={onCategoryChange}
      {disabled}
    />
    <Field label="Dodatkowy opis miejsca" style="grid-area: location-desc">
      <Input
        bind:value={animalFormData.locationDescription}
        placeholder="Informacja gdzie przebywa zwierzę"
        pattern=".*\S+.*"
        {disabled}
      />
    </Field>
    {#if animalFormData.virtualCaretakerType === VirtualCaretakerType.Znalazl}
      <Field label="Moim wirtualnym opiekunem jest" style="grid-area: v-c-name">
        <Input
          bind:value={animalFormData.virtualCaretakerName}
          pattern=".*\S+.*"
          {disabled}
        />
      </Field>
    {/if}
  </div>
  <AnimalMiniatureForm {revalidateForm} bind:animal={animalFormData} {disabled}/>
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
