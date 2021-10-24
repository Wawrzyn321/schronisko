<script lang="ts">
  import Modal from '../shared/Modal.svelte';
  import { animalsService } from '../../services/AnimalsService';
  import type { Animal } from '.prisma/client';
  import { notifyError } from '../../contexts/notification.context';
  import type { AnimalListElement } from '../../common/types';

  let loading = false;

  export let modalVisible: boolean;
  export let onAnimalDeleted: (animal: AnimalListElement) => any;
  export let animal: AnimalListElement;

  async function deleteAnimal() {
    try {
      loading = true;
      await animalsService.delete(animal.id);
      onAnimalDeleted(animal);
    } catch (e) {
      notifyError({ message: 'Nie udało się usunąć zwierzęcia: ' + e.message });
    }
    loading = false;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń zwierzę"
  confirmText="Usuń"
  onConfirm={deleteAnimal}
  disabledConfirm={loading}
  loadingConfirm={loading}
>
  {#if !!animal}
    <p>
      Czy na pewno chcesz usunąć zwierzę <strong> {animal.name}</strong>?
      Pamiętaj, że zawsze możesz określić je jako niewidoczne lub przenieść za
      tęczowy most.
    </p>
  {/if}
</Modal>
