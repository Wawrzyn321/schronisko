<script lang="ts">
  import type { AnimalGender } from '.prisma/client';
  import { Field, Select } from 'svelma';
  import { animalGenders, animalGendersMap } from '../animalMetadata';

  export let gender: AnimalGender;
</script>

<Field label="Płeć" style="grid-area: gender" labelFor="płeć">
  <Select
    placeholder="Wybierz płeć"
    required
    expanded
    nativeSize={1}
    bind:selected={gender}
    id="płeć"
  >
    {#each animalGenders as gender}
      <option value={gender}>{animalGendersMap[gender]}</option>
    {/each}
  </Select>
</Field>
