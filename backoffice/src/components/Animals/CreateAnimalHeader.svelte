<script lang="ts">
  import { Button } from 'svelma';

  export let isPublic: boolean;
  export let isValid: boolean;
  export let createAnimal: () => any;
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
    <Button type="is-primary" disabled={!isValid} on:click={createAnimal}>
      Dodaj
    </Button>
  </div>
</header>

<style lang="scss">
  label {
    margin-right: 16px;
  }
</style>
