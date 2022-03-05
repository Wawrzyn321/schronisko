<script lang="ts">
  import { Tooltip } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import type { AnimalImageParams } from '../../../services/AnimalImagesService';
  import { isReadonly } from './animal-readonly';

  export let isValid: boolean;
  export let animalData: AnimalData;
  export let images: AnimalImageParams[];

  export function formTooltipMessage(animal: AnimalData, images: AnimalImageParams[]) {
    if (!animal.description && !isReadonly(animal.category)) {
      return 'Uzupełnij opis zwierzęcia.';
    } else if (!animal.name) {
      return 'Uzupełnij imię.';
    } else if (!animal.refNo) {
      return 'Uzupełnij numer ewidencyjny.';
    } else if (!animal.contactInfo) {
      return 'Uzupełnij dane kontaktowe.';
    } else if(images.every(i => !!i.data)) {
      return 'Uzupełnij wymagane obrazy w zdjęcia zwierzęcia.';
    } else {
      return 'Uzupełnij wymagane pola.';
    }
  }
</script>

{#if isValid}
  <slot />
{:else}
  <Tooltip position="is-left" label={formTooltipMessage(animalData, images)}>
    <slot />
  </Tooltip>
{/if}
