<script lang="ts">
  import { AnimalLocation, AnimalType } from '.prisma/client';
  import { Field, Select } from 'svelma';
  import { animalLocations, animalLocationsMap } from '../animalMetadata';

  export let type: AnimalType;
  export let location: AnimalLocation;
</script>

<Field
  label="Miejsce przebywania"
  message={type === AnimalType.DOG && location === AnimalLocation.KociaChatka
    ? 'Pies w Kociej Chatce?'
    : ''}
>
  <Select
    placeholder="Wybierz miejsce..."
    required
    expanded
    nativeSize={1}
    bind:selected={location}
  >
    {#each animalLocations as location}
      <option value={location}>{animalLocationsMap[location]}</option>
    {/each}
  </Select>
</Field>
