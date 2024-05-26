<script lang="ts">
  import { AnimalCategory, VirtualCaretakerType } from '@prisma-app/client';
  import { Field } from 'svelma';
  import { animalCategories, animalCategoriesMap } from '../animalMetadata';
  import Select from './../../shared/Select.svelte';

  export let virtualCaretakerType: VirtualCaretakerType;
  export let category: AnimalCategory;
  export let onChange: (category: AnimalCategory) => void;
  export let disabled: boolean;

  function hasWarning(
    type: VirtualCaretakerType,
    category: AnimalCategory
  ): boolean {
    // ZaTeczowymMostem
    if (
      category === AnimalCategory.ZaTeczowymMostem &&
      type === VirtualCaretakerType.Szuka
    ) {
      return true;
    }
    // ZnalazlyDom
    if (
      category === AnimalCategory.ZnalazlyDom &&
      type !== VirtualCaretakerType.NiePrzypisany
    ) {
      return true;
    }
    // NiedawnoZnalezione
    if (
      category === AnimalCategory.NiedawnoZnalezione &&
      type !== VirtualCaretakerType.NiePrzypisany
    ) {
      return true;
    }
    return false;
  }

  const onInput = (e: { detail: AnimalCategory }) => onChange(e.detail);

  $: showWarning = hasWarning(virtualCaretakerType, category);
</script>

<Field
  label="Kategoria"
  message={showWarning ? 'Czy to na pewno właściwa kategoria?' : ''}
  style="grid-area: category"
  labelFor="category-select"
>
  <Select
    id="category-select"
    placeholder="Wybierz kategorię..."
    required
    expanded
    nativeSize={1}
    bind:selected={category}
    on:input={onInput}
    {disabled}
  >
    {#each animalCategories as category}
      <option value={category}>{animalCategoriesMap[category]}</option>
    {/each}
  </Select>
</Field>
