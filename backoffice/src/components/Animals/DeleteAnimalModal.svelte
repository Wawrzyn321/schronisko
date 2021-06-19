<script lang="ts">
  import Modal from './../Modal.svelte';
  import { animalsService } from '../../services/AnimalsService';
  import type { Animal } from '.prisma/client';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onAnimalDeleted: (animal: Animal) => any;
  export let animal: Animal;

  async function deleteAnimal() {
    try {
      await animalsService.delete(animal.id);
      onAnimalDeleted(animal);
    } catch (e) {
      notifyError({ message: 'Nie udało się usunąć zwierzęcia: ' + e.message });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń zwierze"
  confirmText="Usuń"
  onConfirm={deleteAnimal}
>
  {#if !!animal}
    <p>
      Czy na pewno chceesz usunąć zwierzę <strong> {animal.name}</strong>?
      Pamiętaj, że zawsze możesz określić je jako niewidoczne lub przenieść za
      tęczowy most.
    </p>
  {/if}
</Modal>
