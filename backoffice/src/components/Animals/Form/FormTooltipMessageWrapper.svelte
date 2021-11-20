<script lang="ts">
  import { Tooltip } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import { isReadonly } from './animal-readonly';

  export let isValid: boolean;
  export let animalData: AnimalData;

  export function formTooltipMessage(animal: AnimalData) {
    if (!animal.description && !isReadonly(animal.category)) {
      return 'Uzupełnij opis zwierzęcia.';
    } else if (!animal.name) {
      return 'Uzupełnij imię.';
    } else if (!animal.refNo) {
      return 'Uzupełnij numer ewidencyjny.';
    } else if (!animal.contactInfo) {
      return 'Uzupełnij dane kontaktowe.';
    } else {
      return null;
    }
  }
</script>

{#if isValid}
  <slot />
{:else}
  <Tooltip position="is-left" label={formTooltipMessage(animalData)}>
    <slot />
  </Tooltip>
{/if}
