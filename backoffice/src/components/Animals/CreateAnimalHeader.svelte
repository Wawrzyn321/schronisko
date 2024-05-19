<script lang="ts">
  import { Button } from 'svelma';
  import type { AnimalFormData } from '../../services/AnimalsService';
  import type { AnimalImageParams } from '../../services/AnimalImagesService';
  import FormTooltipMessageWrapper from './Form/FormTooltipMessageWrapper.svelte';

  export let isPublic: boolean;
  export let isValid: boolean;
  export let images: AnimalImageParams[];
  export let isCreating: boolean;
  export let createAnimal: () => void;
  export let animalFormData: AnimalFormData;
</script>

<header class="g-flex-between-100">
  <h1>
    <a href="/#/animals">Zwierzęta</a>
    <span class="g-breadcrumb-separator">/ </span>Dodaj
  </h1>
  <div class="g-header-actions">
    <label>
      <input
        checked={isPublic}
        type="checkbox"
        on:change={() => (isPublic = !isPublic)}
      />
      Widoczny na stronie
    </label>
    <FormTooltipMessageWrapper {isValid} {animalFormData} {images}>
      <Button
        type="is-primary"
        disabled={!isValid || isCreating}
        on:click={createAnimal}
        aria-label="Dodaj zwierzę"
      >
        Dodaj
      </Button>
    </FormTooltipMessageWrapper>
  </div>
</header>

<style lang="scss">
  label {
    margin-right: 16px;
  }
</style>
