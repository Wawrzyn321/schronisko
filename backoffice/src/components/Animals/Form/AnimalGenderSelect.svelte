<script lang="ts">
  import type { AnimalGender } from '.prisma/client';
  import { Field, Select } from 'svelma';
  import { animalGenders, animalGendersMap } from '../animalMetadata';

  export let gender: AnimalGender;
</script>

<Field label="Płeć">
  <Select
    placeholder="Wybierz płeć"
    required
    expanded
    nativeSize={1}
    bind:selected={gender}
  >
    {#each animalGenders as gender}
      <option value={gender}>{animalGendersMap[gender]}</option>
    {/each}
  </Select>
</Field>
