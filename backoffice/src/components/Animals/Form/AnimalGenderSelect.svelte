<script lang="ts">
  import type { AnimalGender } from '@prisma-app/client';
  import { Field, Select } from 'svelma';
  import { animalGenders, animalGendersMap } from '../animalMetadata';

  export let gender: AnimalGender;
  export let disabled: boolean;
</script>

<Field label="Płeć" style="grid-area: gender" labelFor="płeć">
  <Select
    placeholder="Wybierz płeć"
    required
    expanded
    nativeSize={1}
    bind:selected={gender}
    {disabled}
  >
    {#each animalGenders as gender}
      <option value={gender}>{animalGendersMap[gender]}</option>
    {/each}
  </Select>
</Field>
