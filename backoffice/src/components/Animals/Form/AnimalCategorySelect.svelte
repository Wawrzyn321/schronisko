<script lang="ts">
  import { AnimalCategory, VirtualCaretakerType } from '.prisma/client';
  import { Field, Select } from 'svelma';
  import { animalCategories, animalCategoriesMap } from '../animalMetadata';

  export let virtualCaretakerType: VirtualCaretakerType;
  export let category: AnimalCategory;

  function computeWarning(type: VirtualCaretakerType, category: AnimalCategory): boolean {
    // ZaTeczowymMostem
    if (category === AnimalCategory.ZaTeczowymMostem && type === VirtualCaretakerType.Szuka) {
      return true;
    }
    // ZnalazlyDom
    if (category === AnimalCategory.ZnalazlyDom && type !== VirtualCaretakerType.NiePrzypisany) {
      return true;
    }
    // NiedawnoZnalezione
    if (category === AnimalCategory.NiedawnoZnalezione && type !== VirtualCaretakerType.NiePrzypisany) {
      return true;
    }
    return false;
  }
  
  $: hasWarning = computeWarning(virtualCaretakerType, category);
</script>

<Field label="Kategoria" message={hasWarning ? "Czy to na pewno właściwa kategoria?" : ""}>
  <Select
    placeholder="Wybierz kategorię..."
    required
    expanded
    nativeSize={1}
    bind:selected={category}
  >
    {#each animalCategories as category}
      <option value={category}>{animalCategoriesMap[category]}</option>
    {/each}
  </Select>
</Field>
