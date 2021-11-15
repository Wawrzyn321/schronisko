<script lang="ts">
  import type { Animal } from '.prisma/client';

  import { Button } from 'svelma';
  import FormTooltipMessageWrapper from './Form/FormTooltipMessageWrapper.svelte';

  export let isPublic: boolean;
  export let isValid: boolean;
  export let isCreating: boolean;
  export let createAnimal: () => any;
  export let animal: Animal;
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
    <FormTooltipMessageWrapper {isValid} {animal}>
      <Button
        type="is-primary"
        disabled={!isValid || isCreating}
        on:click={createAnimal}
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
