<script lang="ts">
  import { AnimalLocation, AnimalType } from '@prisma-app/client';
  import { Field, Select } from 'svelma';
  import { animalLocations, animalLocationsMap } from '../animalMetadata';

  export let type: AnimalType;
  export let location: AnimalLocation | null;
  export let disabled: boolean;
</script>

<Field
  label="Miejsce przebywania"
  message={type === AnimalType.DOG && location === AnimalLocation.KociaChatka
    ? 'Pies w Kociej Chatce?'
    : ''}
  style="grid-area: location"
>
  <Select
    placeholder="Wybierz miejsce..."
    required
    expanded
    nativeSize={1}
    bind:selected={location}
    {disabled}
  >
    {#each animalLocations as location}
      <option value={location}>{animalLocationsMap[location]}</option>
    {/each}
  </Select>
</Field>
