<script lang="ts">
  import type { AnimalType } from '@prisma-app/client';
  import { Field, Select } from 'svelma';
  import { animalTypes, animalTypesMap } from '../animalMetadata';

  export let type: AnimalType;
  export let disabled: boolean;
</script>

<Field label="Rodzaj">
  <Select
    placeholder="Wybierz typ zwierzęcia"
    required
    expanded
    nativeSize={1}
    bind:selected={type}
    {disabled}
  >
    {#each animalTypes as type}
      <option value={type}>{animalTypesMap[type]}</option>
    {/each}
  </Select>
</Field>
